import React, { useState } from "react";
import { getImage } from "../../images/getImage";
import { Link, useNavigate } from "react-router-dom";
import { axiosRequest } from "../../utils/axiosRequest";

const Registration = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copassword, setCoPassword] = useState("");

  const [show, setShow] = useState(false);

  const [show1, setShow1] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      let user = {
        userName: userName,
        email: email,
        password: password,
        confirmPassword: copassword,
      };
      const { data } = await axiosRequest.post("Account/register", user);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="py-[40px] flex justify-center items-center">
      <div className="w-[380px] flex flex-wrap justify-center content-between">
        <div className="w-[350px] py-[20px] flex flex-wrap justify-center content-between border-[1px] border-gray-300 rounded-[5px]">
          <img src={getImage.logo} className="h-[51px]" alt="" />
          <div className="w-[270px] text-center">
            <p className="text-[15px] text-gray-500 font-bold my-[10px]">
              Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.
            </p>
          </div>
          <button className="w-[270px] h-[36px] rounded-[5px] text-[white] bg-[#0095f6] my-[10px] font-bold">
            Войти через Facebook
          </button>
          <div className="w-[90%] text-gray-500 text-center mb-[10px]">или</div>
          <form
            onSubmit={handleRegister}
            action=""
            className="w-[100%] flex flex-wrap justify-center content-start text-center"
          >
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              className="outline-none w-[270px] h-[36px] rounded-[5px] border-[1px] border-gray-300 bg-[#e8f0fe] text-[12px] pl-[10px]"
              placeholder="Имя пользователя"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="outline-none w-[270px] h-[36px] rounded-[5px] border-[1px] border-gray-300 bg-[#e8f0fe] text-[12px] pl-[10px] my-[10px]"
              placeholder="Эл. адрес"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              className="outline-none w-[270px] h-[36px] rounded-[5px] border-[1px] border-gray-300 bg-[#e8f0fe] text-[12px] pl-[10px]"
              placeholder="Пароль"
            />
            <input
              value={copassword}
              onChange={(e) => setCoPassword(e.target.value)}
              type={show ? "text" : "password"}
              className="outline-none w-[270px] h-[36px] rounded-[5px] border-[1px] border-gray-300 bg-[#e8f0fe] text-[12px] pl-[10px] my-[10px]"
              placeholder="Потвердите пароль"
            />
            <div className=" w-[270px] h-[36px] flex items-center gap-[5px]">
              <div>
                <input
                  value={show}
                  onChange={(e) => setShow(e.target.checked)}
                  type="checkbox"
                />
              </div>
              <div>
                <h1 className="text-[14px]">Show password </h1>
              </div>
            </div>
            <p className="text-[gray] text-[12px] mt-[10px] w-[270px]">
              Люди, которые пользуются нашим сервисом, могли загрузить вашу
              контактную информацию в Instagram.{" "}
            </p>
            <p className="text-[#385185] text-[12px] my-[20px] w-[270px]">
              <span className="text-[gray]">
                Регистрируясь, вы принимаете наши{" "}
              </span>
              Условия, Политику конфиденциальности, и Политику в отношении
              файлов cookie
            </p>
            <button className="w-[270px] h-[36px] rounded-[5px] text-[white] bg-[#0095f6] mb-[20px] font-bold">
              Регистрация
            </button>
          </form>
        </div>
        <div className="w-[350px] h-[63px] flex justify-center items-center border-[1px] border-gray-300 my-[10px] rounded-[5px]">
          <p className="text-[14px]">
            Есть аккаунт?{" "}
            <Link to="/">
              <span className="text-[#0095f6] font-bold">Вход</span>
            </Link>
          </p>
        </div>
        <div className="w-[100%] text-center my-[10px]">
          Установите приложение.
        </div>
        <div className="w-[350px] h-[40px] flex justify-center items-center">
          <button className="w-[136px] h-[40px]">
            <img
              src={getImage.appstore}
              className="w-[100%] h-[100%] mr-[10px]"
              alt=""
            />
          </button>
          <button className="w-[136px] h-[40px]">
            <img
              src={getImage.ggplay}
              className="w-[100%] h-[100%] ml-[10px]"
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
