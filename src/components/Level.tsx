import React, { FC, ChangeEvent } from "react";

import Level, { LevelType } from "../types/Level";

interface LevelComponentProps {
  level: Level;
  currency: string;
  onLevelChange: (level: Level) => any;
}

// TODO: should level be optional?
const LevelComponent: FC<LevelComponentProps> = ({
  onLevelChange,
  level,
  currency = "$"
}) => {
  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    onLevelChange({ value: 0, type: e.target.value as LevelType });
  };

  const handleLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    onLevelChange({ ...level, value: +e.target.value });
  };

  return (
    <>
      <label htmlFor="level">{currency}</label>
      <input
        id="level"
        type="number"
        min="0"
        onChange={handleLevelChange}
        value={level.value}
      ></input>
      <div>
        {Object.keys(LevelType).map((lt: string) => {
          return (
            <React.Fragment key={lt}>
              <input
                type="radio"
                id={lt}
                name="levelType"
                onChange={handleTypeChange}
                value={lt}
                checked={level.type === lt}
              ></input>
              <label htmlFor={lt}>{lt}</label>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default LevelComponent;
