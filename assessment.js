'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の全ての子供を削除する
 * @param {HTMLElement}} element 
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

userNameInput.onkeypress = (e) => {
    if (e.code != 'Enter') return;
    assessmentButton.onclick();
}

assessmentButton.onclick = () => {
    console.log('onclick');
    createResultArea();
}

/**
 * 診断結果エリアの作成
 */
function createResultArea() {

    removeAllChildren(resultDivided);
    removeAllChildren(tweetDivided);

    const userName = userNameInput.value;
    if (userName.length === 0) {
        return false;
    }

    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const para = document.createElement('p');
    const result = assessment(userName);
    para.innerText = result;
    resultDivided.appendChild(para);

    createTweetArea(result);
}

/**
 * Tweetエリアの作成
 */
function createTweetArea(resultText) {
    
    const anchor = document.createElement('a');
    const hrefVal = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefVal);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', resultText + '\r\n');
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
}

const answers = [
    '{userName}のいいところは声です。\n{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。\n{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。\n{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。\n{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な\n{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。\n{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。\n{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る\n{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。\n{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。\n{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。\n{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない\n{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく\n{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。\n{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの\n{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる\n{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す
 * @param {string} userName ユーザー名
 * @returns {string} 診断結果
 */
function assessment(userName) {

    // userNameを構成する文字の文字コードを全て加算
    var sumOfCharCode = 0;
    for (var i = 0; i < userName.length; i++) {
        sumOfCharCode += userName.charCodeAt(i);
    }

    const index = sumOfCharCode % answers.length;
    const result = answers[index].replace(/\{userName\}/g, userName);

    return result;
}

console.assert(assessment('太郎') === answers[8].replace(/\{userName\}/g, '太郎'), '名前置換え処理エラー');
console.assert(assessment('太郎') === assessment('太郎'), '同一名なのに結果が異なるエラー');
