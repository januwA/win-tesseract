const languages = [
  { code: "afr", lang: "Afrikaans" },
  { code: "amh", lang: "Amharic" },
  { code: "ara", lang: "Arabic" },
  { code: "asm", lang: "Assamese" },
  { code: "aze", lang: "Azerbaijani" },
  { code: "aze_cyrl", lang: "Azerbaijani - Cyrillic" },
  { code: "bel", lang: "Belarusian" },
  { code: "ben", lang: "Bengali" },
  { code: "bod", lang: "Tibetan" },
  { code: "bos", lang: "Bosnian" },
  { code: "bul", lang: "Bulgarian" },
  { code: "cat", lang: "Catalan; Valencian" },
  { code: "ceb", lang: "Cebuano" },
  { code: "ces", lang: "Czech" },
  { code: "chi_sim", lang: "Chinese - Simplified" },
  { code: "chi_tra", lang: "Chinese - Traditional" },
  { code: "chr", lang: "Cherokee" },
  { code: "cym", lang: "Welsh" },
  { code: "dan", lang: "Danish" },
  { code: "deu", lang: "German" },
  { code: "dzo", lang: "Dzongkha" },
  { code: "ell", lang: "Greek, Modern (1453-)" },
  { code: "eng", lang: "English" },
  { code: "enm", lang: "English, Middle (1100-1500)" },
  { code: "epo", lang: "Esperanto" },
  { code: "est", lang: "Estonian" },
  { code: "eus", lang: "Basque" },
  { code: "fas", lang: "Persian" },
  { code: "fin", lang: "Finnish" },
  { code: "fra", lang: "French" },
  { code: "frk", lang: "German Fraktur" },
  { code: "frm", lang: "French, Middle (ca. 1400-1600)" },
  { code: "gle", lang: "Irish" },
  { code: "glg", lang: "Galician" },
  { code: "grc", lang: "Greek, Ancient (-1453)" },
  { code: "guj", lang: "Gujarati" },
  { code: "hat", lang: "Haitian; Haitian Creole" },
  { code: "heb", lang: "Hebrew" },
  { code: "hin", lang: "Hindi" },
  { code: "hrv", lang: "Croatian" },
  { code: "hun", lang: "Hungarian" },
  { code: "iku", lang: "Inuktitut" },
  { code: "ind", lang: "Indonesian" },
  { code: "isl", lang: "Icelandic" },
  { code: "ita", lang: "Italian" },
  { code: "ita_old", lang: "Italian - Old" },
  { code: "jav", lang: "Javanese" },
  { code: "jpn", lang: "Japanese" },
  { code: "kan", lang: "Kannada" },
  { code: "kat", lang: "Georgian" },
  { code: "kat_old", lang: "Georgian - Old" },
  { code: "kaz", lang: "Kazakh" },
  { code: "khm", lang: "Central Khmer" },
  { code: "kir", lang: "Kirghiz; Kyrgyz" },
  { code: "kor", lang: "Korean" },
  { code: "kur", lang: "Kurdish" },
  { code: "lao", lang: "Lao" },
  { code: "lat", lang: "Latin" },
  { code: "lav", lang: "Latvian" },
  { code: "lit", lang: "Lithuanian" },
  { code: "mal", lang: "Malayalam" },
  { code: "mar", lang: "Marathi" },
  { code: "mkd", lang: "Macedonian" },
  { code: "mlt", lang: "Maltese" },
  { code: "msa", lang: "Malay" },
  { code: "mya", lang: "Burmese" },
  { code: "nep", lang: "Nepali" },
  { code: "nld", lang: "Dutch; Flemish" },
  { code: "nor", lang: "Norwegian" },
  { code: "ori", lang: "Oriya" },
  { code: "pan", lang: "Panjabi; Punjabi" },
  { code: "pol", lang: "Polish" },
  { code: "por", lang: "Portuguese" },
  { code: "pus", lang: "Pushto; Pashto" },
  { code: "ron", lang: "Romanian; Moldavian; Moldovan" },
  { code: "rus", lang: "Russian" },
  { code: "san", lang: "Sanskrit" },
  { code: "sin", lang: "Sinhala; Sinhalese" },
  { code: "slk", lang: "Slovak" },
  { code: "slv", lang: "Slovenian" },
  { code: "spa", lang: "Spanish; Castilian" },
  { code: "spa_old", lang: "Spanish; Castilian - Old" },
  { code: "sqi", lang: "Albanian" },
  { code: "srp", lang: "Serbian" },
  { code: "srp_latn", lang: "Serbian - Latin" },
  { code: "swa", lang: "Swahili" },
  { code: "swe", lang: "Swedish" },
  { code: "syr", lang: "Syriac" },
  { code: "tam", lang: "Tamil" },
  { code: "tel", lang: "Telugu" },
  { code: "tgk", lang: "Tajik" },
  { code: "tgl", lang: "Tagalog" },
  { code: "tha", lang: "Thai" },
  { code: "tir", lang: "Tigrinya" },
  { code: "tur", lang: "Turkish" },
  { code: "uig", lang: "Uighur; Uyghur" },
  { code: "ukr", lang: "Ukrainian" },
  { code: "urd", lang: "Urdu" },
  { code: "uzb", lang: "Uzbek" },
  { code: "uzb_cyrl", lang: "Uzbek - Cyrillic" },
  { code: "vie", lang: "Vietnamese" },
  { code: "yid", lang: "Yiddish" },
];

new Vue({
  el: "#app",
  create() {
    this.languages = languages;
  },
  data() {
    return {
      inputType: 1,
      inputTypes: [
        { id: 1, text: "本地图片" },
        { id: 2, text: "网络图片" },
      ],
      input: "https://tesseract.projectnaptha.com/img/eng_bw.png",
      lang: "eng",
      hideProgress: true,
      progress: -1,
      result: "",
    };
  },

  methods: {
    async upload(e) {
      if (e.target.files.length) {
        const file = e.target.files[0];
        this.input = file;
      }
    },
    async start() {
      this.hideProgress = false;
      const worker = Tesseract.createWorker({
        logger: (m) => {
          if (m.jobId) {
            this.progress = Number(m.progress);
          }
        },
      });
      await worker.load();
      await worker.loadLanguage(this.lang);
      await worker.initialize(this.lang);
      const {
        data: { text },
      } = await worker.recognize(this.input);
      this.result = text;
      await worker.terminate();
      this.hideProgress = true;
    },
  },
});
