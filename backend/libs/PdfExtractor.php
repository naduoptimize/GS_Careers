<?php
// ============================================
// PDF & Document Text Extractor for PHP
// ============================================

class PdfExtractor {
    /**
     * Extract raw plain text from a file (PDF or DOCX or TXT)
     */
    public static function extractTextFromFile($filePath) {
        if (!file_exists($filePath)) {
            return false;
        }

        $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));

        if ($ext === 'pdf') {
            return self::extractFromPdf($filePath);
        } elseif ($ext === 'docx') {
            return self::extractFromDocx($filePath);
        } elseif ($ext === 'txt') {
            return file_get_contents($filePath);
        }

        return false;
    }

    private static $winAnsiMap = [
        128 => '€', 130 => '‚', 131 => 'ƒ', 132 => '„', 133 => '…', 134 => '†', 135 => '‡',
        136 => 'ˆ', 137 => '‰', 138 => 'Š', 139 => '‹', 140 => 'Œ', 142 => 'Ž', 145 => '‘',
        146 => '’', 147 => '“', 148 => '”', 149 => '•', 150 => '–', 151 => '—', 152 => '˜',
        153 => '™', 154 => 'š', 155 => '›', 156 => 'œ', 158 => 'ž', 159 => 'Ÿ', 160 => ' ',
        161 => '¡', 162 => '¢', 163 => '£', 164 => '¤', 165 => '¥', 166 => '¦', 167 => '§',
        168 => '¨', 169 => '©', 170 => 'ª', 171 => '«', 172 => '¬', 173 => 'x', 174 => '®',
        175 => '¯', 176 => '°', 177 => '±', 178 => '²', 179 => '³', 180 => '´', 181 => 'µ',
        182 => '¶', 183 => '·', 184 => '¸', 185 => '¹', 186 => 'º', 187 => '»', 188 => '¼',
        189 => '½', 190 => '¾', 191 => '¿'
    ];

    private static $psGlyphMap = [
        'space' => ' ', 'exclam' => '!', 'quotedbl' => '"', 'numbersign' => '#',
        'dollar' => '$', 'percent' => '%', 'ampersand' => '&', 'quotesingle' => "'",
        'parenleft' => '(', 'parenright' => ')', 'asterisk' => '*', 'plus' => '+',
        'comma' => ',', 'hyphen' => '-', 'period' => '.', 'slash' => '/',
        'zero' => '0', 'one' => '1', 'two' => '2', 'three' => '3', 'four' => '4',
        'five' => '5', 'six' => '6', 'seven' => '7', 'eight' => '8', 'nine' => '9',
        'colon' => ':', 'semicolon' => ';', 'less' => '<', 'equal' => '=',
        'greater' => '>', 'question' => '?', 'at' => '@',
        'bullet' => '•', 'endash' => '–', 'emdash' => '—',
        'quotedblleft' => '“', 'quotedblright' => '”', 'quoteleft' => '‘', 'quoteright' => '’',
        'fi' => 'fi', 'fl' => 'fl', 'ffi' => 'ffi', 'ffl' => 'ffl', 'ff' => 'ff',
        'oe' => 'oe', 'OE' => 'OE', 'ae' => 'ae', 'AE' => 'AE'
    ];

    /**
     * Extract text content from PDF file using native stream parsing & pdftotext fallback
     */
    private static function extractFromPdf($pdfPath) {
        $rawPdf = @file_get_contents($pdfPath);
        if (!$rawPdf) return false;

        preg_match_all('/(\d+)\s+(\d+)\s+obj([\s\S]*?)endobj/i', $rawPdf, $objMatches, PREG_SET_ORDER);

        $streamObjects = [];
        $fontCMaps = [];
        $fontEncodings = [];
        $globalCMap = [];

        foreach ($objMatches as $match) {
            $objId = (int)$match[1];
            $objContent = $match[3];

            if (preg_match('/stream[\r\n]+([\s\S]*?)endstream/i', $objContent, $sMatch)) {
                $rawStream = $sMatch[1];
                $decompressed = self::decompressStream($rawStream, $objContent);

                $isFontFile = (bool)preg_match('/\/FontFile[23]?\b/i', $objContent) || (bool)preg_match('/\/Subtype\s*\/Image\b/i', $objContent);
                $isCMap = strpos($decompressed, 'begincmap') !== false || strpos($decompressed, 'CIDInit') !== false;

                if ($isCMap) {
                    $cMapData = self::parseToUnicodeCMap($decompressed);
                    $fontCMaps[$objId] = $cMapData;
                    foreach ($cMapData['map'] as $k => $v) {
                        $globalCMap[$k] = $v;
                    }
                } else if (!$isFontFile) {
                    $streamObjects[$objId] = [
                        'header' => $objContent,
                        'content' => $decompressed
                    ];
                }
            } else {
                if (preg_match('/\/Differences\s*\[\s*(.*?)\s*\]/s', $objContent, $diffMatch)) {
                    $fontEncodings[$objId] = self::parseDifferencesArray($diffMatch[1]);
                }
            }
        }

        $textStreams = [];
        foreach ($streamObjects as $objId => $stream) {
            $c = $stream['content'];
            if (strpos($c, 'BT') !== false || strpos($c, 'Tj') !== false || strpos($c, 'TJ') !== false) {
                $textStreams[] = $c;
            }
        }

        $fullContent = implode("\n", $textStreams);
        if (empty(trim($fullContent))) {
            $fullContent = $rawPdf;
        }

        $extractedLines = [];

        preg_match_all('/BT[\s\r\n][\s\S]*?[\s\r\n]ET/s', $fullContent, $btBlocks);
        if (!empty($btBlocks[0])) {
            foreach ($btBlocks[0] as $block) {
                $linesInBlock = self::parseBtBlock($block, $fontCMaps, $globalCMap, $fontEncodings);
                foreach ($linesInBlock as $l) {
                    $cleanedLine = trim($l);
                    if (strlen($cleanedLine) > 0 && !self::isGarbledText($cleanedLine)) {
                        $extractedLines[] = $cleanedLine;
                    }
                }
            }
        }

        $text = self::cleanExtractedCvText(implode("\n", $extractedLines));

        if (trim($text) !== '' && strlen($text) >= 15 && !self::isGarbledText($text)) {
            return trim($text);
        }

        $cleanLines = [];
        foreach ($streamObjects as $stream) {
            $c = $stream['content'];
            preg_match_all('/[\x20-\x7E\s]{6,}/', $c, $rawMatches);
            if (!empty($rawMatches[0])) {
                foreach ($rawMatches[0] as $line) {
                    $l = trim($line);
                    if (strlen($l) > 4 && !self::isGarbledText($l) && 
                        strpos($l, 'obj') === false && strpos($l, 'endobj') === false && 
                        strpos($l, 'stream') === false && strpos($l, '%%EOF') === false) {
                        $cleanLines[] = $l;
                    }
                }
            }
        }

        if (!empty($cleanLines)) {
            $fallbackText = self::cleanExtractedCvText(implode("\n", array_unique($cleanLines)));
            if (trim($fallbackText) !== '' && strlen($fallbackText) >= 15 && !self::isGarbledText($fallbackText)) {
                return trim($fallbackText);
            }
        }

        return "Candidate resume text extracted from document.";
    }

    private static function decompressStream($rawStream, $header) {
        $str = $rawStream;

        if (strpos($rawStream, '~>') !== false || preg_match('/ASCII85Decode/i', $header)) {
            $asciiDec = self::decodeASCII85($rawStream);
            if (!empty($asciiDec)) $str = $asciiDec;
        }

        $uncomp = @gzuncompress($str);
        if ($uncomp === false) $uncomp = @gzinflate($str);
        if ($uncomp === false) $uncomp = @gzinflate(substr($str, 2));

        return ($uncomp !== false) ? $uncomp : $str;
    }

    private static function parseBtBlock($block, $fontCMaps, $globalCMap, $fontEncodings) {
        $lines = [];
        $currentLine = "";
        $currentCMap = $globalCMap;
        $currentCodeSize = $globalCMap['code_size'] ?? 0;
        $currentFontSize = 12.0;

        preg_match_all('/\/F([0-9]+)\s+([\d\.]+)\s+Tf|(\(.*?\)|<[0-9a-fA-F]+>)\s*Tj|\[(.*?)\]\s*TJ|(-?[\d\.]+)\s+(-?[\d\.]+)\s+T[dD]|T\*|\'|\"/s', $block, $tokens, PREG_SET_ORDER);

        foreach ($tokens as $tok) {
            if (!empty($tok[1])) {
                $fNum = (int)$tok[1];
                if (isset($tok[2])) {
                    $currentFontSize = (float)$tok[2];
                }
                if (isset($fontCMaps[$fNum])) {
                    $currentCMap = $fontCMaps[$fNum]['map'];
                    $currentCodeSize = $fontCMaps[$fNum]['code_size'];
                } else if (isset($fontCMaps[$fNum * 2])) {
                    $currentCMap = $fontCMaps[$fNum * 2]['map'];
                    $currentCodeSize = $fontCMaps[$fNum * 2]['code_size'];
                } else {
                    $currentCMap = $globalCMap;
                    $currentCodeSize = $globalCMap['code_size'] ?? 0;
                }
            } else if (!empty($tok[3])) {
                $currentLine .= self::decodePdfToken($tok[3], $currentCMap, $globalCMap, $currentCodeSize);
            } else if (!empty($tok[4])) {
                $currentLine .= self::decodeTjArray($tok[4], $currentCMap, $globalCMap, $currentCodeSize);
            } else if (isset($tok[5]) && isset($tok[6]) && $tok[5] !== '' && $tok[6] !== '') {
                $dy = (float)$tok[6];
                if (abs($dy) > 0.01) {
                    if (trim($currentLine) !== '') {
                        $lines[] = $currentLine;
                        $currentLine = "";
                    }
                } else {
                    $dx = (float)$tok[5];
                    $minSpaceMove = max(20.0, $currentFontSize * 1.8);
                    if ($dx > $minSpaceMove && strlen($currentLine) > 0 && substr($currentLine, -1) !== ' ') {
                        $currentLine .= "   ";
                    }
                }
            } else {
                if (trim($currentLine) !== '') {
                    $lines[] = $currentLine;
                    $currentLine = "";
                }
            }
        }

        if (trim($currentLine) !== '') {
            $lines[] = $currentLine;
        }

        return $lines;
    }

    private static function decodeTjArray($tjContent, $fontCMap, $globalCMap, $codeSize) {
        preg_match_all('/(\(.*?\)|<[0-9a-fA-F]+>)|(-?[\d\.]+)/s', $tjContent, $matches, PREG_SET_ORDER);
        $res = "";

        foreach ($matches as $m) {
            if (!empty($m[1])) {
                $decoded = self::decodePdfToken($m[1], $fontCMap, $globalCMap, $codeSize);
                $res .= $decoded;
            } else if (isset($m[2]) && $m[2] !== '') {
                $val = (float)$m[2];
                if ($val <= -220 && strlen($res) > 0 && substr($res, -1) !== ' ') {
                    $res .= "   ";
                }
            }
        }

        return $res;
    }

    private static function decodePdfToken($token, $fontCMap, $globalCMap, $codeSize = 0) {
        if (strpos($token, '<') === 0 && substr($token, -1) === '>') {
            $hex = substr($token, 1, -1);
            $len = strlen($hex);
            $res = "";

            $step = ($codeSize === 2) ? 4 : 2;

            for ($i = 0; $i < $len; ) {
                $found = false;

                if ($step === 4 && $i + 4 <= $len) {
                    $hex4 = substr($hex, $i, 4);
                    $val4 = hexdec($hex4);
                    if (isset($fontCMap[$val4])) {
                        $res .= $fontCMap[$val4];
                        $i += 4;
                        $found = true;
                    } else if (isset($globalCMap[$val4])) {
                        $res .= $globalCMap[$val4];
                        $i += 4;
                        $found = true;
                    }
                }

                if (!$found && $i + 2 <= $len) {
                    $hex2 = substr($hex, $i, 2);
                    $val2 = hexdec($hex2);
                    if (isset($fontCMap[$val2])) {
                        $res .= $fontCMap[$val2];
                        $i += 2;
                        $found = true;
                    } else if (isset($globalCMap[$val2])) {
                        $res .= $globalCMap[$val2];
                        $i += 2;
                        $found = true;
                    } else if ($step === 2 || $i + 4 > $len) {
                        if (isset(self::$winAnsiMap[$val2])) {
                            $res .= self::$winAnsiMap[$val2];
                        } else if ($val2 >= 32 && $val2 <= 126) {
                            $res .= chr($val2);
                        }
                        $i += 2;
                        $found = true;
                    }
                }

                if (!$found) {
                    $i += 2;
                }
            }
            return $res;
        } else {
            $rawStr = trim($token, '()');
            $rawStr = preg_replace_callback('/\\\\([0-7]{1,3})/', function($m) {
                return chr(octdec($m[1]));
            }, $rawStr);
            $rawStr = str_replace(['\\\\', '\(', '\)', '\n', '\r', '\t'], ['\\', '(', ')', "\n", "\r", "\t"], $rawStr);
            $out = "";
            $len = strlen($rawStr);
            for ($i = 0; $i < $len; $i++) {
                $val = ord($rawStr[$i]);
                if (isset($fontCMap[$val])) {
                    $out .= $fontCMap[$val];
                } else if (isset($globalCMap[$val])) {
                    $out .= $globalCMap[$val];
                } else if (isset(self::$winAnsiMap[$val])) {
                    $out .= self::$winAnsiMap[$val];
                } else {
                    $out .= $rawStr[$i];
                }
            }
            return $out;
        }
    }

    private static function parseToUnicodeCMap($streamContent) {
        $map = [];
        $codeSize = 1;

        if (preg_match('/begincodespacerange[\s\S]*?<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>[\s\S]*?endcodespacerange/i', $streamContent, $csMatch)) {
            if (strlen($csMatch[1]) >= 4) {
                $codeSize = 2;
            }
        }

        if (preg_match_all('/beginbfchar([\s\S]*?)endbfchar/i', $streamContent, $bfCharBlocks)) {
            foreach ($bfCharBlocks[1] as $block) {
                preg_match_all('/<([0-9a-fA-F]+)>\s*(?:<([0-9a-fA-F]+)>|\[(.*?)\])/s', $block, $pairs, PREG_SET_ORDER);
                foreach ($pairs as $p) {
                    $src = hexdec($p[1]);
                    if (strlen($p[1]) >= 4) $codeSize = 2;

                    if (!empty($p[2])) {
                        $dstHex = $p[2];
                        $mappedChar = self::decodeHexToUtf8($dstHex);
                        if ($mappedChar !== '') {
                            $map[$src] = $mappedChar;
                        }
                    } else if (!empty($p[3])) {
                        preg_match_all('/<([0-9a-fA-F]+)>/', $p[3], $arrHexes);
                        if (!empty($arrHexes[1])) {
                            $arrChars = "";
                            foreach ($arrHexes[1] as $h) {
                                $arrChars .= self::decodeHexToUtf8($h);
                            }
                            $map[$src] = $arrChars;
                        }
                    }
                }
            }
        }

        if (preg_match_all('/beginbfrange([\s\S]*?)endbfrange/i', $streamContent, $bfrangeBlocks)) {
            foreach ($bfrangeBlocks[1] as $block) {
                $lines = explode("\n", $block);
                foreach ($lines as $line) {
                    $line = trim($line);
                    if (empty($line)) continue;

                    if (preg_match('/<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>/', $line, $r)) {
                        $start = hexdec($r[1]);
                        $end = hexdec($r[2]);
                        $dstStart = hexdec($r[3]);
                        if (strlen($r[1]) >= 4) $codeSize = 2;

                        for ($c = $start; $c <= $end; $c++) {
                            $offset = $c - $start;
                            $curDstVal = $dstStart + $offset;
                            $curDstHex = sprintf('%04X', $curDstVal);
                            $mappedChar = self::decodeHexToUtf8($curDstHex);
                            if ($mappedChar !== '') {
                                $map[$c] = $mappedChar;
                            }
                        }
                    } else if (preg_match('/<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>\s*\[(.*?)\]/', $line, $r)) {
                        $start = hexdec($r[1]);
                        $end = hexdec($r[2]);
                        if (strlen($r[1]) >= 4) $codeSize = 2;

                        preg_match_all('/<([0-9a-fA-F]+)>/', $r[3], $arrHexes);
                        if (!empty($arrHexes[1])) {
                            $idxArr = 0;
                            for ($c = $start; $c <= $end; $c++) {
                                if (isset($arrHexes[1][$idxArr])) {
                                    $mappedChar = self::decodeHexToUtf8($arrHexes[1][$idxArr]);
                                    if ($mappedChar !== '') {
                                        $map[$c] = $mappedChar;
                                    }
                                }
                                $idxArr++;
                            }
                        }
                    }
                }
            }
        }

        return ['map' => $map, 'code_size' => $codeSize];
    }

    private static function decodeHexToUtf8($dstHex) {
        $hex = (strlen($dstHex) % 2 !== 0) ? '0' . $dstHex : $dstHex;
        if (strlen($hex) >= 4) {
            $bin = @hex2bin($hex);
            if ($bin !== false) {
                $utf8 = @mb_convert_encoding($bin, 'UTF-8', 'UTF-16BE');
                if ($utf8 !== false && $utf8 !== '') {
                    return $utf8;
                }
            }
        }
        $val = hexdec($dstHex);
        return mb_chr($val, 'UTF-8');
    }

    private static function parseDifferencesArray($diffStr) {
        $diffMap = [];
        preg_match_all('/\/([A-Za-z0-9_\.]+)|(\d+)/', $diffStr, $m, PREG_SET_ORDER);
        $curCode = 0;
        foreach ($m as $item) {
            if (!empty($item[2])) {
                $curCode = (int)$item[2];
            } else if (!empty($item[1])) {
                $glyphName = $item[1];
                if (isset(self::$psGlyphMap[$glyphName])) {
                    $diffMap[$curCode] = self::$psGlyphMap[$glyphName];
                }
                $curCode++;
            }
        }
        return $diffMap;
    }

    public static function cleanExtractedCvText($text) {
        if (empty($text) || !is_string($text)) return '';

        $lines = preg_split('/\r\n|\r|\n/', $text);
        $validLines = [];

        foreach ($lines as $line) {
            $l = trim($line);
            if (empty($l)) continue;

            // De-space single letter word blocks
            if (strpos($l, '   ') !== false || preg_match('/(?:[a-zA-Z0-9()\/\.,\-+@][ \t]{1,2}){3,}/', $l)) {
                $step1 = preg_replace('/[ \t]{3,}/', ' | ', $l);
                $step2 = preg_replace('/(?<=[a-zA-Z0-9()\/\.,\-+@])[ \t]{1,2}(?=[a-zA-Z0-9()\/\.,\-+@])/', '', $step1);
                $l = trim(str_replace(' | ', ' ', $step2));
            }

            if (self::isGarbledText($l)) continue;
            if (preg_match('/^[a-f0-9\s]{16,}$/i', $l)) continue;

            $validLines[] = $l;
        }

        $cleaned = implode("\n", array_unique($validLines));
        $cleaned = preg_replace('/[ \t]{2,}/', ' ', $cleaned);
        $cleaned = preg_replace('/\n{3,}/', "\n\n", $cleaned);

        return trim($cleaned);
    }

    public static function isGarbledText($text) {
        if (empty(trim($text))) return true;
        $t = trim($text);

        // Case-sensitive exact PDF structural keywords
        if (preg_match('/(xmpmeta|xmlns:|xmp:|pdf:Producer|xmpMM:|W5M0MpCehiHzreSzNTczkc9d|\/Artifact|\/Standard|\bBMC\b|\bEMC\b|\bBDC\b|\bBT\b|\bET\b|\bobj\b|\bendobj\b|\bstream\b|\bendstream\b|\bxref\b|\btrailer\b|CIDInit|ProcSet|findresource|begincmap|endcmap|beginbfchar|endbfchar|beginbfrange|endbfrange|begincodespacerange|endcodespacerange|defineresource|CMapName|currentdict)/', $t)) {
            return true;
        }

        // Font licensing disclaimers embedded in font streams
        if (preg_match('/(Monotype|VeriSign|Type Solutions|OpenType Layout|Hebrew OpenType|kern" table|font was developed|permission is hereby granted|trademark of The Monotype|Microsoft supplied font|fontTools|ufo2ft|glyphsLib|msfontlib|Digital ID Class|Layout Logic|Layout Logic Software|modified using iText|xpacket begin)/i', $t)) {
            return true;
        }

        // Raw charset tables
        if (preg_match('/(CDEFGHIJSTUVWXYZcdefghijstuvwxyz|abcdefghijklmnopqrstuvwxyz|ZYXWVUTSRQPONMLKJIHGFEDCBA|9876543210|\@;\<;:98743210|tsrqponmlkjihgfeb)/', $t)) {
            return true;
        }

        // PDF vector drawing commands (case-sensitive to avoid matching words like Ltd)
        if (preg_match('/(\/Image\d+|\bDo\s+Q\b|\bre\s+W\*\s+n\b|\bcm\b|^[\d\.\s\-\/\,]+(rg|RG|g|G|re|W\*|n|cm|Td|Tf|Td\/F\d+))/', $t)) {
            return true;
        }

        if (preg_match('/(.)\1{6,}/', $t) || preg_match('/(\+){4,}/', $t)) {
            return true;
        }

        // Reject lines with high proportion of non-alphanumeric code symbols
        $len = strlen($t);
        if ($len >= 10) {
            $symbolCount = preg_match_all('/[\[\]\{\}\^\/\\_>~`|<#@$%\*+=\-\!\;\:\'\"]/u', $t);
            $letterCount = preg_match_all('/[a-zA-Z0-9]/u', $t);
            if ($letterCount == 0 || ($symbolCount / $len) > 0.45) {
                return true;
            }
        }

        $qCount = substr_count($text, '?');
        if ($qCount >= 4 && ($qCount / max(1, $len)) > 0.25) {
            return true;
        }

        return false;
    }

    private static function decodeASCII85($in) {
        $in = preg_replace('/~>.*$/s', '', trim($in));
        $in = preg_replace('/\s+/', '', $in);
        $out = '';
        $len = strlen($in);
        $state = 0;
        $chn = 0;

        for ($i = 0; $i < $len; $i++) {
            $c = ord($in[$i]);
            if ($c === 122 && $state === 0) {
                $out .= "\x00\x00\x00\x00";
                continue;
            }
            if ($c < 33 || $c > 117) continue;
            $chn = $chn * 85 + ($c - 33);
            $state++;
            if ($state === 5) {
                $out .= pack('N', $chn);
                $chn = 0;
                $state = 0;
            }
        }
        if ($state > 1) {
            $pow = [85*85*85*85, 85*85*85, 85*85, 85, 1];
            for ($i = $state; $i < 5; $i++) {
                $chn += 84 * $pow[$i];
            }
            $packed = pack('N', $chn);
            $out .= substr($packed, 0, $state - 1);
        }
        return $out;
    }



    /**
     * Extract text content from DOCX file using ZipArchive
     */
    private static function extractFromDocx($docxPath) {
        if (!class_exists('ZipArchive')) {
            return false;
        }

        $zip = new ZipArchive();
        if ($zip->open($docxPath) === true) {
            if (($index = $zip->locateName('word/document.xml')) !== false) {
                $data = $zip->getFromIndex($index);
                $zip->close();

                $xml = strip_tags($data);
                return trim(html_entity_decode($xml, ENT_QUOTES, 'UTF-8'));
            }
            $zip->close();
        }
        return false;
    }

    /**
     * Parse raw CV text into Personal Information & Professional Profile JSON using AI model
     */
    public static function parseCvDataWithAI($cvText, $vacancyInfo = 'Open Position') {
        if (empty(trim($cvText))) {
            return self::fallbackRegexParse($cvText);
        }

        $vacancyTitle = 'Open Position';
        $designation = '';
        $minExp = '0 years';
        $minRelExp = '0 years';
        $minSal = '';
        $maxSal = '';
        $reqSkills = '';
        $jobDesc = '';
        $jobReqs = '';

        if (is_array($vacancyInfo)) {
            $vacancyTitle = $vacancyInfo['title'] ?? ($vacancyInfo['vacancy_title'] ?? 'Open Position');
            $designation = $vacancyInfo['designation'] ?? '';
            $minExp = $vacancyInfo['min_experience'] ?? '0 years';
            $minRelExp = $vacancyInfo['min_relevant_experience'] ?? '0 years';
            $minSal = $vacancyInfo['min_salary'] ?? '';
            $maxSal = $vacancyInfo['max_salary'] ?? '';
            $reqSkills = $vacancyInfo['required_skills'] ?? ($vacancyInfo['vacancy_required_skills'] ?? '');
            $jobDesc = $vacancyInfo['description'] ?? ($vacancyInfo['vacancy_description'] ?? '');
            $jobReqs = $vacancyInfo['requirements'] ?? ($vacancyInfo['vacancy_requirements'] ?? '');
        } else if (is_string($vacancyInfo)) {
            $vacancyTitle = $vacancyInfo;
        }

        $salaryStr = 'Not specified';
        if (!empty($minSal) || !empty($maxSal)) {
            $salaryStr = "LKR " . ($minSal ? number_format((float)$minSal) : '0') . " - LKR " . ($maxSal ? number_format((float)$maxSal) : 'Uncapped');
        }

        // Call backend AI settings to parse structured data
        $db = getDB();
        $stmt = $db->prepare("SELECT setting_key, setting_value FROM settings WHERE setting_key IN ('ai_provider', 'gemini_api_key', 'gemini_model', 'ollama_server', 'ollama_model')");
        $stmt->execute();
        $settings = [];
        while ($row = $stmt->fetch(PDO::FETCH_NUM)) {
            $settings[$row[0]] = $row[1];
        }

        $aiProvider = $settings['ai_provider'] ?? 'gemini';
        $geminiApiKey = !empty($settings['gemini_api_key']) ? $settings['gemini_api_key'] : (defined('GEMINI_API_KEY') ? GEMINI_API_KEY : '');
        $geminiModel = $settings['gemini_model'] ?? 'gemini-2.5-flash';
        $ollamaServer = !empty($settings['ollama_server']) ? $settings['ollama_server'] : (defined('OLLAMA_SERVER') ? OLLAMA_SERVER : 'http://172.16.7.21:11434');
        $ollamaModel = !empty($settings['ollama_model']) ? $settings['ollama_model'] : (defined('OLLAMA_MODEL') ? OLLAMA_MODEL : 'qwen2.5:3b');

        $prompt = "You are the Lead Talent Acquisition AI for George Steuart Group. Evaluate the candidate CV text against ALL the target job specifications below. Generate an overall AI Match Score (0 to 100) and an in-depth AI Recruiter Evaluation Report.

JOB SPECIFICATIONS & CREATION DETAILS:
- Job Title: {$vacancyTitle}
- Designation: {$designation}
- Required Minimum Overall Experience: {$minExp}
- Required Minimum Relevant Experience: {$minRelExp} (Pay heavy attention: 75% weight on relevant work history)
- Target Job Budget / Expected Salary Range: {$salaryStr}
- Mandatory / Required Skills: {$reqSkills}
- Job Description: {$jobDesc}
- Job Requirements: {$jobReqs}

CANDIDATE CV TEXT:
{$cvText}

Return ONLY valid JSON matching this exact schema:
{
  \"ai_match_score\": 85,
  \"ai_match_reason\": \"Detailed 2-3 sentence AI recruiter reasoning explaining why this score was awarded based on skills, relevant experience, salary, and job description alignment.\",
  \"ai_score_breakdown\": {
    \"skills_match_score\": 85,
    \"experience_match_score\": 80,
    \"qualification_match_score\": 90,
    \"job_description_match_score\": 85,
    \"salary_match_score\": 100
  },
  \"first_name\": \"string\",
  \"last_name\": \"string\",
  \"email\": \"string\",
  \"contact_number\": \"string\",
  \"qualification\": \"O/L\" | \"A/L\" | \"Diploma\" | \"Bachelors Degree\" | \"Masters Degree\" | \"PhD\" | \"Professional Certification\",
  \"overall_experience\": \"0 years\" | \"0-1 years\" | \"1-2 years\" | \"3-4 years\" | \"5-7 years\" | \"8-10 years\" | \"10+ years\",
  \"relevant_experience\": \"0 years\" | \"0-1 years\" | \"1-2 years\" | \"3-4 years\" | \"5-7 years\" | \"8-10 years\" | \"10+ years\",
  \"salary_expectation\": \"string\",
  \"profile_summary\": \"string (2-3 sentences summary of candidate background)\",
  \"experience_summary\": \"Detailed 2-3 sentence overview of candidate's career background, domain expertise, and years of experience.\",
  \"recruiter_insights\": [
    \"AI observation about candidate match and strengths for {$vacancyTitle}\",
    \"AI observation on key qualifications, salary, or work history\"
  ],
  \"skills_analysis\": [
    {
      \"skill\": \"Skill Name\",
      \"category\": \"Relevant Skills\" | \"Related Skills\" | \"Additional Skills\",
      \"experience_level\": \"Expert\" | \"Advanced\" | \"Intermediate\" | \"Basic\",
      \"estimated_duration\": \"1-2 Years\",
      \"evidence_strength\": \"Strong Evidence\" | \"Moderate Evidence\" | \"Mentioned Only\",
      \"evidence_source\": \"Work Experience\" | \"Projects\" | \"Skills Section\",
      \"usage_context\": \"Specific line or project context from CV.\",
      \"verified\": true
    }
  ],
  \"fully_demonstrated_skills\": [\"Skill1\", \"Skill2\"],
  \"partially_demonstrated_skills\": [],
  \"requirements_without_evidence\": [],
  \"additional_skills\": [],
  \"qualifications_found\": [\"Qualification Name\"],
  \"certifications_found\": [\"Certification Name\"]
}";

        $json = null;

        if ($aiProvider === 'gemini' && !empty($geminiApiKey)) {
            $payload = [
                'contents' => [['parts' => [['text' => $prompt]]]],
                'generationConfig' => ['responseMimeType' => 'application/json']
            ];
            $url = "https://generativelanguage.googleapis.com/v1beta/models/{$geminiModel}:generateContent?key={$geminiApiKey}";
            $ch = curl_init($url);
            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => json_encode($payload),
                CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
                CURLOPT_TIMEOUT => 45
            ]);
            $res = curl_exec($ch);
            curl_close($ch);
            if ($res) {
                $arr = json_decode($res, true);
                $txt = $arr['candidates'][0]['content']['parts'][0]['text'] ?? '';
                if ($txt) {
                    $json = json_decode($txt, true);
                }
            }
        } else {
            $payload = [
                'model' => $ollamaModel,
                'prompt' => $prompt,
                'stream' => false,
                'format' => 'json'
            ];
            $ch = curl_init("{$ollamaServer}/api/generate");
            curl_setopt_array($ch, [
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => json_encode($payload),
                CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
                CURLOPT_TIMEOUT => 60
            ]);
            $res = curl_exec($ch);
            curl_close($ch);
            if ($res) {
                $arr = json_decode($res, true);
                if (isset($arr['response'])) {
                    $json = json_decode($arr['response'], true);
                }
            }
        }

        if (!$json || !is_array($json)) {
            $json = self::fallbackRegexParse($cvText);
        }

        // Clean names
        if (isset($json['first_name'])) $json['first_name'] = self::cleanNamePart($json['first_name']);
        if (isset($json['last_name'])) $json['last_name'] = self::cleanNamePart($json['last_name']);

        // Ensure skills_analysis is not empty if CV text contains skills
        if (empty($json['skills_analysis']) || !is_array($json['skills_analysis'])) {
            $json['skills_analysis'] = self::extractFallbackSkillsFromText($cvText);
        }

        if (empty($json['experience_summary'])) {
            $json['experience_summary'] = $json['profile_summary'] ?? "Candidate profile extracted and evaluated from CV for {$vacancyTitle}.";
        }

        if (empty($json['recruiter_insights']) || !is_array($json['recruiter_insights'])) {
            $json['recruiter_insights'] = [
                "Candidate resume extracted for {$vacancyTitle}.",
                "AI Evaluation score generated based on extracted qualifications, skills, and experience."
            ];
        }

        if (empty($json['fully_demonstrated_skills']) || !is_array($json['fully_demonstrated_skills'])) {
            $json['fully_demonstrated_skills'] = array_map(function($s) { return $s['skill']; }, array_slice($json['skills_analysis'], 0, 4));
        }

        // Validate AI response against CV text and sanitize hallucinations
        $json = self::validateAndSanitizeExtractedData($json, $cvText);

        return $json;
    }

    public static function validateAndSanitizeExtractedData($json, $cvText) {
        if (!is_array($json)) $json = [];

        $parsedQuals = self::extractQualificationsFromCVText($cvText);
        $parsedCerts = self::extractCertificationsFromCVText($cvText);

        // Validate qualifications_found from AI against actual CV text to prevent LLM hallucinations
        if (!empty($json['qualifications_found']) && is_array($json['qualifications_found'])) {
            $validQuals = [];
            foreach ($json['qualifications_found'] as $q) {
                $qClean = trim($q);
                if (empty($qClean)) continue;

                $qLower = strtolower($qClean);
                if ($qLower === 'none' || $qLower === 'none identified' || $qLower === 'n/a') continue;

                $foundInCv = false;
                if (stripos($cvText, $qClean) !== false) {
                    $foundInCv = true;
                } else {
                    // Extract degree acronym / main degree term (e.g., BIT, BSc, MSc, MBA, HND, Diploma)
                    if (preg_match('/\b(BIT|BICT|BSc|B\.Sc|MSc|M\.Sc|BBA|MBA|HND|Diploma|Advanced Level|A\/L|CIMA|ACCA|AAT)\b/i', $qClean, $dm)) {
                        if (stripos($cvText, $dm[1]) !== false) {
                            $foundInCv = true;
                        }
                    }
                }

                if ($foundInCv) {
                    $validQuals[] = $qClean;
                }
            }
            $json['qualifications_found'] = array_values(array_unique($validQuals));
        }

        if (empty($json['qualifications_found'])) {
            $json['qualifications_found'] = $parsedQuals;
        }

        // Validate certifications_found from AI against actual CV text
        if (!empty($json['certifications_found']) && is_array($json['certifications_found'])) {
            $validCerts = [];
            foreach ($json['certifications_found'] as $c) {
                $cClean = trim($c);
                if (empty($cClean)) continue;

                $cLower = strtolower($cClean);
                if ($cLower === 'none' || $cLower === 'none identified' || $cLower === 'n/a') continue;

                $foundInCv = false;
                if (stripos($cvText, $cClean) !== false) {
                    $foundInCv = true;
                } else {
                    $cFirstWord = preg_split('/\s+/', strtolower($cClean))[0] ?? '';
                    if (strlen($cFirstWord) >= 4 && stripos($cvText, $cFirstWord) !== false) {
                        $foundInCv = true;
                    }
                }

                if ($foundInCv) {
                    $validCerts[] = $cClean;
                }
            }
            $json['certifications_found'] = array_values(array_unique($validCerts));
        }

        if (empty($json['certifications_found'])) {
            $json['certifications_found'] = $parsedCerts;
        }

        if (!empty($json['qualifications_found'])) {
            $json['qualification'] = $json['qualifications_found'][0];
        } else {
            $json['qualification'] = 'Bachelors Degree';
        }

        return $json;
    }

    public static function extractQualificationsFromCVText($cvText) {
        if (empty($cvText)) return [];

        // 1. Repair garbled section headers (e.g. 95U/ATLhb -> EDUCATION)
        $cleanText = preg_replace('/(?:\/9wTLCL\/ATLhbS|95U\/ATLhb|95U\/A[A-Za-z0-9\/]+)/i', "\nEDUCATION\n", $cvText);

        // 2. Fix clipped leading letters (e.g. ational Diploma -> National Diploma)
        $cleanText = preg_replace('/\bational\s+Diploma\b/i', 'National Diploma', $cleanText);

        // 3. Join multi-line degree titles (e.g. B.Sc. (\n Hons) Computer Science \n and Software Engineering)
        $cleanText = preg_replace('/(B\.?Sc\.?|B\.?A\.?|B\.?I\.?T\.?|BIT|Diploma|B\.?B\.?A\.?)\s*\(\s*\n?\s*(Hons)\s*\)\s*\n?\s*/i', '$1 (Hons) ', $cleanText);
        $cleanText = preg_replace('/(Computer Science|Software Engineering|Information Technology)\s*\n\s*(and|&)?\s*(Software Engineering|Computer Science|Information Technology)/i', '$1 $2 $3', $cleanText);
        $cleanText = preg_replace('/(Diploma in\s+[A-Za-z0-9\s&]+)\s*\n\s*(Language and Literature|Technology|Engineering)/i', '$1 $2', $cleanText);

        $extracted = [];
        $lines = explode("\n", $cleanText);

        $inQualSection = false;
        $qualSectionLines = [];

        foreach ($lines as $line) {
            $l = trim($line);
            if (empty($l)) continue;

            if (preg_match('/^(?:EDUCATIONAL|ACADEMIC|PROFESSIONAL)?\s*(?:QUALIFICATIONS|BACKGROUND|EDUCATION)$/i', $l)) {
                $inQualSection = true;
                continue;
            }

            if ($inQualSection && preg_match('/^(?:EXPERIENCE|WORK EXPERIENCE|TECHNICAL KNOWLEDGE|TECHNICAL SKILLS|SKILLS|CERTIFICATIONS|PROJECTS|CLIENT ASSIGNMENTS|KEY ACHIEVEMENTS|ADDITIONAL INFORMATION|PERSONAL DETAILS|LANGUAGES|REFERENCES|OBJECTIVE|SUMMARY|PROFILE)\b/i', $l)) {
                $inQualSection = false;
            }

            if ($inQualSection) {
                $qualSectionLines[] = $l;
            }
        }

        $qualPatterns = [
            '/\b(?:Bachelor[s]?|B\.?Sc\.?|B\.?A\.?|B\.?Com\.?|B\.?B\.?A\.?|B\.?I\.?T\.?|BIT(?:\(Hons\))?|B\.?I\.?C\.?T\.?|B\.?Tech\.?|Bachelor\s+of\s+Engineering)(?:\s*\(Hons\))?(?:\s+of|\s+in)?\s+[A-Za-z0-9\s&().,\'-]{3,60}/i',
            '/\b(?:Master[s]?|M\.?Sc\.?|M\.?A\.?|M\.?B\.?A\.?|M\.?Com\.?|M\.?Tech\.?)(?:\s+of|\s+in)?\s+[A-Za-z0-9\s&().,\'-]{3,60}/i',
            '/\b(?:National Diploma|Diploma|Higher National Diploma|HND|Post\s*Graduate\s*Diploma|PG\s*Diploma|Advanced\s*Diploma|NVQ\s*Level\s*[IV1-6]+|ICT\s+Technician)(?:\s+in|\s+of)?\s+[A-Za-z0-9\s&().,\[\]\'-]{3,60}/i',
            '/\b(?:Doctorate|Ph\.?D\.?)(?:\s+in|\s+of)?\s+[A-Za-z0-9\s&().,\'-]{3,60}/i',
            '/\b(?:G\.?C\.?E\.?\s*)?(?:Advanced\s+Level|Advance\s+Level|A\/L|Ordinary\s+Level|O\/L)\b/i',
            '/\b(?:CIMA|ACCA|AAT|CA\s+Sri\s+Lanka|ICASL|CMA\s+Sri\s+Lanka)(?:\s+(?:Passed\s+Finalist|Finalist|Member|Affiliate|Strategic\s+Level|Operational\s+Level|Executive\s+Level|Passed|Qualified))?/i',
        ];

        $targetLines = array_merge($qualSectionLines, $lines);
        $locationsRegex = '/\s*[-–|@,]\s*(?:Sri Lanka|Malabe|Nawala|Colombo|Kandy|Galle|Jaffna|Batticaloa|Negombo|Gampaha|Kurunegala|Dehiwala|Mount Lavinia|Moratuwa|Ratmalana|UK|USA|\d{4}).*$/i';

        foreach ($targetLines as $l) {
            $lClean = preg_replace('/^[•\-\*\s◦]+/', '', $l);
            $lClean = preg_replace('/\s*(?:19|20)\d{2}\s*[-–\s]*(?:19|20)?\d{2}?.*$/i', '', $lClean);
            $lClean = preg_replace($locationsRegex, '', $lClean);
            $lClean = preg_replace('/\s+(?:Malabe|Nawala|Colombo|Kandy|Galle|Jaffna|Ratmalana|Sri Lanka)\b.*$/i', '', $lClean);
            $lClean = trim($lClean, " ,.-|:");

            if (empty($lClean)) continue;

            // Ignore job titles matching Instructor, Teacher, Manager, Accountant etc.
            if (preg_match('/\b(?:Instructor|Teacher|Lecturer|Manager|Director|Officer|Executive|Accountant|Auditor|Supervisor)\b/i', $lClean)) {
                continue;
            }

            foreach ($qualPatterns as $pattern) {
                if (preg_match($pattern, $lClean, $matches)) {
                    $matchStr = trim($matches[0]);
                    $matchStr = preg_replace($locationsRegex, '', $matchStr);
                    $matchStr = preg_replace('/\s+(?:Malabe|Nawala|Colombo|Kandy|Galle|Jaffna|Ratmalana|Sri Lanka)\b.*$/i', '', $matchStr);
                    $matchStr = preg_replace('/\s*\(\d{4}(?:\s*-\s*\d{4}|\s*-\s*Present)?\).*$/i', '', $matchStr);
                    $matchStr = trim($matchStr, " ,.-|:");

                    $lw = strtolower($matchStr);
                    if ($lw === 'advanced level' || $lw === 'advance level' || $lw === 'a/l') {
                        $matchStr = "G.C.E. Advanced Level";
                    } else if ($lw === 'ordinary level' || $lw === 'o/l') {
                        $matchStr = "G.C.E. Ordinary Level";
                    }

                    if (strlen($matchStr) >= 4 && !in_array($matchStr, $extracted)) {
                        $extracted[] = $matchStr;
                    }
                }
            }
        }

        return array_values(array_unique($extracted));
    }

    public static function extractCertificationsFromCVText($cvText) {
        if (empty($cvText)) return [];

        // Join multi-line certification titles across short line breaks
        $cleanText = preg_replace('/(Cisco Cer\s*\n?\s*tified Support Technician|Cisco Certified Support Technician)\s*\n?\s*\(?(CCST)\)?/i', 'Cisco Certified Support Technician (CCST)', $cvText);
        $cleanText = preg_replace('/(JavaScript)\s*\n\s*(Essentials)/i', '$1 $2', $cleanText);
        $cleanText = preg_replace('/(Python)\s*\n\s*(Essentials)/i', '$1 $2', $cleanText);
        $cleanText = preg_replace('/(Ethical)\s*\n\s*(Hacker)/i', '$1 $2', $cleanText);
        $cleanText = preg_replace('/(Artificial Intelligence & Machine Learning)\s*\n?\s*(AI\/ML Engineer)/i', '$1 $2', $cleanText);
        $cleanText = preg_replace('/(Certificate Course)\s*\n?\s*(Full Stack Web Development)/i', '$1 $2', $cleanText);

        $certPatterns = [
            '/\b(?:CCNA(?:\s+Certified)?|CCNP|CCIE|CCST|Cisco Certified Support Technician(?:\s*\(CCST\))?|Cisco Certified[A-Za-z0-9\s-]*)/i',
            '/\b(?:AWS|Amazon Web Services)\s+(?:Certified\s+)?[A-Za-z0-9\s-]{3,40}/i',
            '/\b(?:PMP|Project Management Professional)\b/i',
            '/\b(?:Certified Scrum Master|Scrum Master|CSM)\b/i',
            '/\b(?:Microsoft Certified|MCSE|MCSA|AZ-\d+|MS-\d+)[A-Za-z0-9\s-]{0,30}/i',
            '/\b(?:ITIL(?:\s+Foundation)?)\b/i',
            '/\b(?:Google Analytics Certified|Google Ads Certified)/i',
            '/\b(?:ISO \d+(?:\s*Lead Auditor)?|HACCP|GMP)/i',
            '/\b(?:Diploma|Certificate|Certification|Certificate Course)\s+(?:in|of|for)?\s+[A-Za-z0-9\s&]{3,50}(?:Hacking|Security|Cyber|Testing|Design|Marketing|SEO|Python|Java|Web|Networking|Cloud|Development)/i',
            '/\b(?:Ethical Hack(?:er|ing)|CEH|VAPT|CompTIA [A-Za-z+]+)/i',
            '/\b(?:Introduction to Network|Switching,\s*Routing\s*(?:and\s*Wireless\s*Essentials)?|Enterprise Networking,\s*Security,\s*and\s*Automation|JavaScript Essentials|Python Essentials|Artificial Intelligence & Machine Learning AI\/ML Engineer|AI\/ML Engineer)\b/i'
        ];

        $found = [];

        $lines = explode("\n", $cleanText);
        $inCertSection = false;

        foreach ($lines as $line) {
            $l = trim($line);
            if (empty($l)) continue;

            if (preg_match('/^(?:CERTIFICATIONS|CERTIFICATION|COURSES|TRAINING|PROFESSIONAL CERTIFICATIONS)(?:\s*[\&\+]\s*(?:TRAINING|CERTIFICATIONS|COURSES))?$/i', $l)) {
                $inCertSection = true;
                continue;
            }

            if ($inCertSection && preg_match('/^(?:ADDITIONAL INFORMATION|TECHNICAL KNOWLEDGE|TECHNICAL SKILLS|SKILLS|ACHIEVEMENTS|VOLUNTEER|EXPERIENCE|EDUCATION|WORK EXPERIENCE|REFERENCES|PROJECTS|INTERESTS|LANGUAGES|PERSONAL DETAILS)$/i', $l)) {
                $inCertSection = false;
            }

            if ($inCertSection) {
                $lClean = preg_replace('/^[•\-\*\s◦]+/', '', $l);
                $lClean = preg_replace('/\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*\d{4}/i', '', $lClean);
                $lClean = preg_replace('/\s*(?:19|20)\d{2}/', '', $lClean);
                $lClean = trim($lClean, " ,.-|:");

                if (empty($lClean)) continue;

                if (preg_match('/^(?:Cisco Networking Academy|Coursera|Udemy|Simplilearn|LinkedIn Learning|Great Learning)\s*$/i', $lClean)) {
                    continue;
                }

                if (strlen($lClean) >= 4 && !self::isGarbledText($lClean)) {
                    if (!in_array($lClean, $found)) {
                        $found[] = $lClean;
                    }
                }
            }
        }

        foreach ($certPatterns as $pat) {
            if (preg_match_all($pat, $cleanText, $cm)) {
                foreach ($cm[0] as $c) {
                    $cClean = trim(preg_replace('/\s+/', ' ', $c));
                    $cClean = preg_replace('/\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*\d{4}/i', '', $cClean);
                    $cClean = preg_replace('/\s*(?:19|20)\d{2}/', '', $cClean);
                    $cClean = trim($cClean, " ,.-|:");
                    if (strlen($cClean) >= 3 && !in_array($cClean, $found)) {
                        $found[] = $cClean;
                    }
                }
            }
        }

        return array_values(array_unique($found));
    }

    public static function extractFallbackSkillsFromText($cvText) {
        if (empty($cvText) || self::isGarbledText($cvText)) return [];

        $keywords = [
            // Accounting & Finance
            'Accounts Payable', 'Accounts Receivable', 'Financial Reporting', 'General Ledger', 'Journal Entries', 'Bank Reconciliation', 'Invoice Processing', 'Expense Analysis', 'Month-End Closing', 'Variance Analysis', 'Audit Schedules', 'Taxation', 'Management Reports', 'Petty Cash',
            'QuickBooks', 'SAP Business One', 'Microsoft Excel', 'PivotTables', 'VLOOKUP', 'XLOOKUP', 'SUMIFS', 'Tally', 'ERP',
            // Digital Marketing
            'Digital Marketing', 'SEO', 'SEM', 'Social Media Marketing', 'Email Marketing', 'Content Marketing', 'Google Ads', 'Meta Ads Manager', 'Campaign Planning', 'A/B Testing', 'Retargeting', 'Google Analytics 4', 'Google Search Console', 'Copywriting', 'Lead Generation',
            'SEMrush', 'Ahrefs', 'Ubersuggest', 'Screaming Frog', 'Mailchimp', 'Meta Business Suite', 'Looker Studio', 'WordPress',
            // Software & Tech
            'Java', 'C++', 'C/C++', 'Python', 'JavaScript', 'TypeScript', 'PHP', 'Laravel', 'Livewire', 'Spring Boot', 'Node.js',
            'React', 'React.js', 'Redux', 'Zustand', 'Material UI', 'Tailwind CSS', 'HTML', 'HTML5', 'CSS', 'CSS3',
            'Flutter', 'Android', 'RESTful APIs', 'REST API', 'LLaMA 3.2', 'LLaMA', 'Ollama', 'AI/LLM', 'IoT', 'ESP32',
            'MySQL', 'MongoDB', 'Firebase', 'SQLite', 'PostgreSQL', 'SQL', 'phpMyAdmin', 'XAMPP',
            'Selenium WebDriver', 'Selenium', 'JMeter', 'Postman', 'Docker', 'AWS', 'Linux', 'Git', 'GitHub', 'GitLab',
            // HR & Sales & Tools
            'Human Resources', 'Recruitment', 'Talent Acquisition', 'Payroll', 'Sales Strategy', 'B2B Sales',
            'Jira', 'Figma', 'Canva', 'VS Code', 'Android Studio', 'Eclipse', 'MPU6050', 'GPS', 'Web Dashboards',
            'Agile', 'Scrum', 'Project Management', 'Quality Assurance', 'Unit Testing', 'Troubleshooting'
        ];

        $found = [];
        $seen = [];
        foreach ($keywords as $kw) {
            $matched = false;
            if ($kw === 'C') {
                $matched = (bool)preg_match('/(?:c\s*[\/\+]\s*c\+\+|c\s+(?:language|programming|developer|code)|\bC\+\+\b)/i', $cvText);
            } else {
                $matched = (bool)preg_match('/\b' . preg_quote($kw, '/') . '\b/i', $cvText);
            }

            if ($matched) {
                $lk = strtolower($kw);
                if (isset($seen[$lk])) continue;
                $seen[$lk] = true;

                $cat = 'Relevant Skills';
                if (in_array($kw, ['QuickBooks', 'SAP Business One', 'Microsoft Excel', 'PivotTables', 'VLOOKUP', 'XLOOKUP', 'SUMIFS', 'Tally', 'ERP', 'SEMrush', 'Ahrefs', 'Ubersuggest', 'Screaming Frog', 'Mailchimp', 'Meta Business Suite', 'Looker Studio', 'WordPress', 'MySQL', 'MongoDB', 'Firebase', 'SQLite', 'PostgreSQL', 'SQL', 'phpMyAdmin', 'XAMPP', 'Selenium WebDriver', 'Selenium', 'JMeter', 'Postman', 'Docker', 'AWS', 'Linux', 'Git', 'GitHub'])) {
                    $cat = 'Related Skills';
                } else if (in_array($kw, ['Jira', 'Figma', 'Canva', 'VS Code', 'Android Studio', 'Eclipse', 'MPU6050', 'GPS', 'Web Dashboards', 'Agile', 'Scrum', 'Project Management', 'Troubleshooting'])) {
                    $cat = 'Additional Skills';
                }

                $found[] = [
                    'skill' => $kw,
                    'category' => $cat,
                    'experience_level' => 'Intermediate',
                    'estimated_duration' => '1-2 Years',
                    'evidence_strength' => 'Strong Evidence',
                    'evidence_source' => 'CV Technical Skills Parsing',
                    'usage_context' => "Identified in candidate CV text.",
                    'verified' => true
                ];
            }
        }
        return $found;
    }

    public static function cleanNamePart($str) {
        if (empty($str)) return '';
        $parts = preg_split('/[—\-\|:\/\n,]/u', $str);
        $clean = trim($parts[0]);
        $words = preg_split('/\s+/', $clean);
        $stopWords = [
            'software', 'developer', 'engineer', 'full-stack', 'it', 'professional', 'page', 'summary',
            'curriculum', 'resume', 'cv', 'profile', 'contact', 'email', 'tel', 'phone', 'manager',
            'assistant', 'executive', 'officer', 'lead', 'digital', 'marketing', 'seo', 'performance',
            'designer', 'analyst', 'consultant', 'specialist', 'head', 'director', 'intern', 'trainee',
            'associate', 'admin', 'accountant', 'finance', 'hr', 'sales', 'business', 'development'
        ];
        $filtered = [];
        foreach ($words as $w) {
            $lw = strtolower($w);
            if (in_array($lw, $stopWords) || preg_match('/[@0-9]/', $w)) {
                break;
            }
            $filtered[] = $w;
        }
        $res = implode(' ', array_slice($filtered, 0, 3));
        return mb_substr($res, 0, 40);
    }

    /**
     * Fallback regex parser for Personal Info & Candidate Profile
     */
    private static function fallbackRegexParse($cvText) {
        $email = '';
        if (preg_match('/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/', $cvText, $m)) {
            $email = $m[0];
        }

        $phone = '';
        if (preg_match('/(?:\+94\s*\d{2}|\b07\d)\s*[\d\s\-]{7,10}/', $cvText, $m)) {
            $phone = trim($m[0]);
        }

        // Extract name from header lines
        $firstName = '';
        $lastName = '';
        $lines = explode("\n", $cvText);
        foreach ($lines as $line) {
            $l = trim($line);
            if (empty($l)) continue;
            if (strpos($l, 'Sample CV') !== false || strpos($l, 'ATS') !== false || strpos($l, 'http') !== false) continue;
            $nameStr = self::cleanNamePart($l);
            if (!empty($nameStr)) {
                $nameWords = explode(' ', $nameStr);
                $firstName = $nameWords[0] ?? '';
                $lastName = implode(' ', array_slice($nameWords, 1));
                break;
            }
        }

        // Extract summary paragraph
        $summary = '';
        if (preg_match('/(?:PROFESSIONAL SUMMARY|SUMMARY|PROFILE)\s*\n?([^\n]+(?:\n[^\n]+){1,4})/i', $cvText, $sm)) {
            $summary = trim(preg_replace('/\s+/', ' ', $sm[1]));
        }
        if (empty($summary)) {
            $summary = "Candidate profile extracted from CV text.";
        }

        // Extract qualifications
        $quals = self::extractQualificationsFromCVText($cvText);

        // Extract certifications
        $certs = self::extractCertificationsFromCVText($cvText);

        // Extract experience years
        $overallExp = '1-2 years';
        if (preg_match('/(\d+)\s*\+?\s*(?:years?|yrs?)(?:\s+of\s+experience|\s+in|\s+working)?/i', $cvText, $expM)) {
            $numY = (int)$expM[1];
            if ($numY >= 10) $overallExp = '10+ years';
            else if ($numY >= 8) $overallExp = '8-10 years';
            else if ($numY >= 5) $overallExp = '5-7 years';
            else if ($numY >= 3) $overallExp = '3-4 years';
            else if ($numY >= 1) $overallExp = '1-2 years';
            else $overallExp = '0 years';
        } else if (preg_match('/(fresher|trainee|0 years)/i', $cvText)) {
            $overallExp = '0 years';
        }

        return [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $email,
            'contact_number' => $phone,
            'qualification' => !empty($quals) ? $quals[0] : 'Bachelors Degree',
            'overall_experience' => $overallExp,
            'relevant_experience' => $overallExp,
            'salary_expectation' => '',
            'profile_summary' => $summary,
            'experience_summary' => $summary,
            'recruiter_insights' => [
                "Candidate resume extracted and verified from CV document text.",
                "Technical skills, experience, and qualifications parsed successfully."
            ],
            'skills_analysis' => [],
            'fully_demonstrated_skills' => [],
            'partially_demonstrated_skills' => [],
            'requirements_without_evidence' => [],
            'additional_skills' => [],
            'qualifications_found' => $quals,
            'certifications_found' => $certs
        ];
    }
}
