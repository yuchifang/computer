import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import KeyBoard from './KeyBoard';
import Screen from './Screen.tsx';
import { useOutSideClick } from '../hooks/hooks';

const WTableBlock = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 110px auto;
  width: 400px;
  height: 500px;
  border-radius: 15px;
  overflow: hidden;
  &:focus {
    outline: none;
  }
`;

export default function Table() {
  const [screenState, setScreenState] = useState({
    finalValue: '0', // 表示計算完 的值 或初始值
    hasAnswer: true,
    calculatorArray: ['0'],
    displayArray: [],
  });

  const [equalAnimationState, setEqualAnimationState] = useState(false); // todo
  const [animationState, setAnimationState] = useState(false); // todo

  const insideRef = useOutSideClick({
    handleOutsideClick: () => setAnimationState(false),
  });

  const [keyBoardKey, setKeyBoardKey] = useState({ newKey: undefined }); //

  const handleOnKeyDownIsVaild = (e) => {
    const newKey = e.key;
    // eslint-disable-next-line no-useless-escape
    if (/Backspace|[0-9\=\+\/\-\*\.]/.test(newKey)) {
      setKeyBoardKey({ newKey });
    }
  };

  const renderScreen = useMemo(
    () => (
      <Screen
        animationState={animationState}
        screenState={screenState}
        equalAnimationState={equalAnimationState}
        setEqualAnimationState={setEqualAnimationState}
      />
    ),
    [animationState, equalAnimationState, screenState],
  );

  return (
    <WTableBlock
      ref={insideRef}
      tabIndex={0}
      onKeyDown={handleOnKeyDownIsVaild}
    >
      {renderScreen}
      <KeyBoard
        keyBoardKey={keyBoardKey}
        setScreenState={setScreenState}
        setEqualAnimationState={setEqualAnimationState}
        setAnimationState={setAnimationState}
        screenState={screenState}
      />
    </WTableBlock>
  );
}
