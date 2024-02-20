import logo from "./assets/logo.svg";
import expand from "./assets/Expand_down.svg";
import copy from "./assets/Copy.svg";
import sound from "./assets/sound_max_fill.svg";
import alfa from "./assets/Sort_alfa.svg";
import sort from "./assets/Horizontal_top_left_main.svg";
import languages from "./languages";
import { useState } from "react";

const Translator = () => {
  const [from, setFrom] = useState("en"); //input lang
  const [to, setTo] = useState("fr"); //output lang
  const selectedClass = "text-whitegray bg-darkgray rounded-xl px-3 my-1";
  const notSelectedClass = "px-3 my-1";

  const [dropDown1, setDropDown1] = useState(false);
  const [dropDown2, setDropDown2] = useState(false);
  const [extraLang1, setExtraLang1] = useState(0); //input language
  const [extraLang2, setExtraLang2] = useState(0); //output language

  const [text, setText] = useState("Hello, how are you?");
  const [length, setLength] = useState(19);
  const handleChange = (event) => {
    //change input text value
    const newText = event.target.value;
    if (newText.length <= 500) {
      setText(newText);
      setLength(newText.length);
    }
  };

  const [result, setResult] = useState("Bonjour, comment allez-vous?");

  const translate = () => {
    //translate the text and display the result
    fetch(
      `https://api.mymemory.translated.net/get?q=${text}!&langpair=${from}|${to}`
    )
      .then((response) => response.json())
      .then((data) => {
        setResult(data.responseData.translatedText);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeyDown = (event) => {
    //translate when clicking enter
    if (event.keyCode === 13) {
      translate();
    }
  };

  const swap = () =>{//switch between input and output languages
    let x = from;
    setFrom(to);
    setTo(x);
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    .catch((error) => {
        console.error('Error copying text: ', error);
    });
}
const speakText = (text, lang) => {
  const speech = new SpeechSynthesisUtterance();
  speech.lang = lang;
  speech.text = text;
  window.speechSynthesis.speak(speech);
};

const sqrBtnStyle ="border-3 border-darkgray rounded-xl p-2 mr-3 hover:bg-skyblue"

  return (
    <div className="bg-[url('./assets/hero_img.jpg')] h-fit min-h-screen bg-black bg-contain bg-no-repeat flex flex-col justify-center items-center gap-4 xl:flex-row xl:px-12 py-44 relative">
      <img src={logo} className="absolute top-20" />
      <div className="bg-input w-11/12 lg:w-5/6 h-80 border-solid border border-darkgray rounded-3xl grid grid-rows-5 p-5">
        <div className="row-span-1 text-lightgray text-sm flex font-semibold gap-8 pb-3 px-3 border-b-2 border-border">
          <button onClick={() => setFrom("detect")}>Detect Language</button>
          <button
            onClick={() => setFrom("en")}
            className={from === "en" ? selectedClass : notSelectedClass}
          >
            English
          </button>
          <button
            onClick={() => setFrom("fr")}
            className={from === "fr" ? selectedClass : notSelectedClass}
          >
            French
          </button>
          <button
            className={"flex items-center relative " + (from !== "fr" && from !== "en" ? selectedClass : notSelectedClass)}
            onClick={() => {
              setDropDown1(!dropDown1);
            }}
          >
            {languages[extraLang1].name}
            <img src={expand} className="ml-1 mt-1" />
            <ul
              className={
                "absolute top-2 left-0 border-solid border border-darkgray rounded-xl bg-darkgray text-whitegray flex flex-col overflow-hidden" +
                (dropDown1 ? "" : " invisible")
              }
            >
              {languages.map((lang, index) => (
                <li
                  key={lang.code}
                  onClick={() => {
                    setExtraLang1(index);
                    setFrom(lang.code);
                  }}
                  className="px-2 py-1 w-full text-left hover:bg-blue"
                >
                  {lang.name}
                </li>
              ))}
            </ul>
          </button>
        </div>
        <div className="row-span-3 py-5 text-white flex flex-col justify-between">
          <textarea
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type="text"
            className="bg-transparent border-none focus:outline-none h-full overflow-hidden resize-none"
          />
          <span className="text-lightgray text-xs text-right">
            {length}/500
          </span>
        </div>
        <div className="row-span-1 flex justify-between items-center">
          <div>
            <button className={sqrBtnStyle} onClick={() => { speakText(text, from) }}>
              <img src={sound} />{" "}
            </button>
            <button className={sqrBtnStyle} onClick={()=>{copyToClipboard(text)}}>
              {" "}
              <img src={copy} />{" "}
            </button>
          </div>
          <button
            onClick={translate}
            className="bg-blue px-6 py-3 border border-skyblue rounded-xl text-white font-semibold flex gap-2 hover:scale-105 transition-transform duration-2000 ease-in-out"
          >
            <img src={alfa} /> Translate
          </button>
        </div>
      </div>

      <div className="bg-output w-11/12 lg:w-5/6 h-80 border-solid border border-darkgray rounded-3xl grid grid-rows-5 p-5">
        <div className="row-span-1 text-lightgray text-sm flex justify-between items-center font-semibold pb-3 px-3 border-b-2 border-border">
          <div className="flex gap-8 h-full">
            <button
              onClick={() => setTo("en")}
              className={to === "en" ? selectedClass : notSelectedClass}
            >
              English
            </button>
            <button
              onClick={() => setTo("fr")}
              className={to === "fr" ? selectedClass : notSelectedClass}
            >
              French
            </button>
            <button
              className={"flex items-center relative " + (to !== "fr" && to !== "en" ? selectedClass : notSelectedClass)}
              onClick={() => {
                setDropDown2(!dropDown2);
              }}
            >
              {languages[extraLang2].name}
              <img src={expand} className="ml-1 mt-1" />
              <ul
                className={
                  "absolute top-2 left-0 border-solid border border-darkgray rounded-xl bg-darkgray text-whitegray flex flex-col overflow-hidden" +
                  (dropDown2 ? "" : " invisible")
                }
              >
                {languages.map((lang, index) => (
                  <li
                    key={lang.code}
                    onClick={() => {
                      setExtraLang2(index);
                      setTo(lang.code);
                    }}
                    className="px-2 py-1 w-full text-left hover:bg-blue"
                  >
                    {lang.name}
                  </li>
                ))}
              </ul>
            </button>
          </div>
          <button className="border-3 border-darkgray rounded-xl h-fit p-1 hover:bg-skyblue" onClick={swap}>
            <img src={sort} />
          </button>
        </div>
        <div className="row-span-3 py-5 text-white">{result}</div>
        <div className="row-span-1">
          <button className={sqrBtnStyle} onClick={() => { speakText(result, to) }}>
            <img src={sound} />{" "}
          </button>
          <button className={sqrBtnStyle} onClick={()=>{copyToClipboard(result)}}>
            {" "}
            <img src={copy} />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Translator;
