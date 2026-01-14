'use client';

import { useState } from 'react';

type DialogType = 'greeting' | 'site-description' | 'self-description';

interface Dialog {
  type: DialogType;
  text: string;
}

const DIALOGS: Record<DialogType, string[]> = {
  greeting: [
    'こんにちは！',
    'お疲れ様です！',
    'いらっしゃい！',
    'お帰り！',
    'よろしく！',
  ],
  'site-description': [
    '開発ブログです',
  ],
  'self-description': [
    '私は卍太郎です',
    'ペットロボです',
    'よろしく！',
  ],
};

export default function RobotBuddy() {
  const [currentDialog, setCurrentDialog] = useState<Dialog>({
    type: 'greeting',
    text: DIALOGS.greeting[0],
  });
  const [isHovering, setIsHovering] = useState(false);

  const getRandomDialog = (type: DialogType) => {
    const dialogs = DIALOGS[type];
    return dialogs[Math.floor(Math.random() * dialogs.length)];
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const cycleDialog = () => {
    const types: DialogType[] = ['greeting', 'site-description', 'self-description'];
    const currentIndex = types.indexOf(currentDialog.type);
    const nextType = types[(currentIndex + 1) % types.length];
    const newText = getRandomDialog(nextType);
    setCurrentDialog({
      type: nextType,
      text: newText,
    });
  };

  return (
    <div
      className="robot-buddy"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={cycleDialog}
    >
      <div className={`robot-bubble ${isHovering ? 'robot-bubble-hover' : ''}`}>
        {currentDialog.text}
      </div>
      <div className={`robot-core ${isHovering ? 'robot-core-active' : ''}`}>
        <div className="robot-body">
          <div className="robot-face">
            <div className="robot-eyes">
              <div className="eye" />
              <div className="eye" />
            </div>
            <div className="robot-mouth" />
          </div>
        </div>
        <div className="robot-legs">
          <div className="robot-leg" />
          <div className="robot-leg" />
        </div>
        <div className="robot-wheels">
          <div className="wheel" />
          <div className="wheel" />
        </div>
      </div>
    </div>
  );
}
