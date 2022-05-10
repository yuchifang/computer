const calcMarkRegExp = new RegExp(/\÷|\×|\+|\-/);
export function hasPoint(string: string): boolean {
  return string.indexOf('.') > -1;
}

export function decimalControl({
  inputString,
  lastCalcString,
}: {
  inputString: string;
    lastCalcString: string;
}): string {
  if (inputString === '.' && hasPoint(lastCalcString)) {
    return lastCalcString;
  }

  if (inputString === '00') {
    return `${lastCalcString}00`;
  }

  return lastCalcString + inputString;
}

export function calcMarkControl({
  inputMarkString,
  calcArrayLastWord,
  calculatorArray,
}: {
  inputMarkString: string;
  calcArrayLastWord: string;
  calculatorArray: string[];
}): string {
  // eslint-disable-next-line no-useless-escape
  if (/\÷|\×/.test(calcArrayLastWord) && inputMarkString === '-') { return 'normal'; }
  // 特別判斷負號 //3*-3
  if (calcArrayLastWord === inputMarkString) {
    return 'noChange';
  }

  if (calcMarkRegExp.test(calcArrayLastWord)) {
    // 是運算符號
    return 'change';
  }

  if (calcArrayLastWord === '-') return 'noChange';

  if (
    calcMarkRegExp.test(inputMarkString)
    && calculatorArray.length === 1
    && calcArrayLastWord === '.'
    && calculatorArray[0].length === 1
  ) { return 'noChange'; }
  // .+3 = error
  return 'normal';
}

export function handleNormalCalc(calculatorArray: string[]): string {
  const Arraylength = calculatorArray.length;
  let index = 0;
  let totalNumber = 0;
  while (Arraylength > index) {
    const calcTarget = Number(calculatorArray[index]);

    // 判斷陣列字串第一個字為什麼符號
    const switchType = calculatorArray[index][0];
    switch (switchType) {
      case '+':
        totalNumber += calcTarget;
        break;
      case '-':
        totalNumber += calcTarget;
        break;
      default: // no operation symbol
        totalNumber += calcTarget;
    }
    index += 1;
  }
  return String(parseFloat(totalNumber.toPrecision(12)));
}

function handleMultiplyCalc({
  controlCalcArray,
  index,
}: {
  controlCalcArray: any[];
  index: number;
}) {
  const prevNumber = Number(controlCalcArray[index - 1]);
  const [_, ...arrayOfTarget] = controlCalcArray[index];
  const returnControlCalcArray = controlCalcArray;

  if (controlCalcArray[index].length > 1) {
    // 處理 [2,x2,x3]
    returnControlCalcArray[index - 1] = undefined;
    returnControlCalcArray[index] = `${prevNumber * Number(arrayOfTarget.join(''))}`;

    return returnControlCalcArray;
  }

  // 處理 [2,x2,x3]
  const nextTarget = Number(controlCalcArray[index + 1]);
  returnControlCalcArray[index - 1] = undefined;
  returnControlCalcArray[index] = undefined;
  returnControlCalcArray[index + 1] = `${prevNumber * nextTarget}`;

  return returnControlCalcArray;
}

function handleDivideCalc({ controlCalcArray, index }) {
  const prevNumber = Number(controlCalcArray[index - 1]);
  const [_, ...calcTargetString] = controlCalcArray[index];
  const returncontrolCalcArray = controlCalcArray;

  if (controlCalcArray[index].length > 1) {
    // 處理 [2,/2,/3]
    returncontrolCalcArray[index - 1] = undefined;
    returncontrolCalcArray[index] = `${
      prevNumber / Number(calcTargetString.join(''))
    }`;
    return returncontrolCalcArray;
  }
  // 處理 [2,/,-2,x3]
  const nextTarget = Number(controlCalcArray[index + 1]);
  returncontrolCalcArray[index - 1] = undefined;
  returncontrolCalcArray[index] = undefined;
  returncontrolCalcArray[index + 1] = `${prevNumber / nextTarget}`;
  return returncontrolCalcArray;
}

export function handlePriorityCalc(controlCalcArray: string[]): string[] {
  // eslint-disable-next-line no-useless-escape
  if (!/(\÷|\×)/g.test(controlCalcArray.join(''))) return controlCalcArray;

  // 如果有* 或 / 就執行下面的邏輯
  const Arraylength = controlCalcArray.length;
  let index = 0;
  let returnControlCalcArray: string [] = controlCalcArray;

  while (Arraylength > index) {
    const switchType = controlCalcArray[index]?.[0]; // 判斷陣列字串第一個字為什麼符號

    switch (switchType) {
      case '×':
        returnControlCalcArray = handleMultiplyCalc({ controlCalcArray, index });
        break;
      case '÷':
        returnControlCalcArray = handleDivideCalc({ controlCalcArray, index });
        break;
      default: // no calc symbol
    }
    index += 1;
  }

  return returnControlCalcArray.filter((item) => item !== undefined);
}

export function handleFormula(controlCalcArray: string[]): boolean {
  const controlCalcArrayLength = controlCalcArray.length;
  const lastString = controlCalcArray[controlCalcArrayLength - 1];
  const lastWord = lastString[lastString.length - 1];
  const LastSecondWord = lastString[lastString.length - 2];
  const lastStringLength = lastString.length;

  if (calcMarkRegExp.test(lastWord)) return false;
  if (lastWord === '.' && calcMarkRegExp.test(LastSecondWord)) return false;
  if (
    lastWord === '.'
    && controlCalcArrayLength === 1
    && lastStringLength === 1
  ) { return false; }
  return true;
}
