"use client";
import { useState, ChangeEvent } from "react";

import {
  Card
} from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox , CheckedState } from "./ui/checkbox";
import { Input } from "./ui/input";

const PasswordGenerator = () => {
  const [length, setLength] = useState<number>(16);
  const [includeUpperCase, setIncludeUpperCase] = useState<boolean>(true);
  const [includeLowerCase, setIncludeLowerCase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");

  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLength(Number(e.target.value));
  };

  const hancdleCheckBoxChange =
    (setter: (value: boolean) => void) =>
    (checked: CheckedState): void => {
      if (typeof checked === "boolean") {
        setter(checked);
      }
    };

  const generatePassword = () => {
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+{}[]|;:,.<>?";

    let allChars = "";
    if (includeUpperCase) allChars += upperCase;
    if (includeLowerCase) allChars += lowerCase;
    if (includeNumbers) allChars += numbers;
    if (includeSymbols) allChars += symbols;
    if (allChars === "") {
      alert("Please select atleast one character type");
      return;
    }
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }
    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(
      () => {
        alert("Password copied to clipboard");
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 bg-white">
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Password Genrator</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Create a secured Password with just a few clicks.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="Length">Password Length</Label>
              <Input
                id="length"
                type="number"
                min="8"
                max="32"
                value={length}
                onChange={handleLengthChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Include:</Label>
              <div className="flex items center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={includeUpperCase}
                  onCheckedChange={hancdleCheckBoxChange(setIncludeUpperCase)}
                />
                <Label htmlFor="uppercase">Uppercase Letters</Label>
              </div>
              <div className="flex items center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={includeLowerCase}
                  onCheckedChange={hancdleCheckBoxChange(setIncludeLowerCase)}
                />
                <Label htmlFor="lowercase">Lowercase Letters</Label>
              </div>
              <div className="flex items center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={hancdleCheckBoxChange(setIncludeNumbers)}
                />
                <Label htmlFor="numbers">Numbers</Label>
              </div>
              <div className="flex items center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={hancdleCheckBoxChange(setIncludeSymbols)}
                />
                <Label htmlFor="symbols">Symbols</Label>
              </div>

            </div>
            <Button type="button" className="w-full" onClick={generatePassword}>
                Generate Password
            </Button>
            <div className="space-y-2">
                <Label htmlFor="password">Generated Password</Label>
                <div className="flex items-center space-x-2">
                    <Input id="password" type="text" value={password} readOnly className="flex-1"/>
                    <Button type="button" onClick={copyToClipboard} >Copy To Clipboard</Button>
                </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PasswordGenerator;
