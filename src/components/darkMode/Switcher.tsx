import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../../hook/useDarkSide";
let theme = true

function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "dark" ? false : true
  );

  const toggleDarkMode = (checked) => {
    theme = colorTheme
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <div>
        <DarkModeSwitch
          className="relative left-3"
          checked={darkSide}
          onChange={toggleDarkMode}
          size={23}
          moonColor="white"
          sunColor="black"
        />
      </div>
    </>
  );
}
export default Switcher;
export {theme}