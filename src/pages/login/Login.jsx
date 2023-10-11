import React, { useState } from "react";
import { getImage } from "../../images/getImage";
import { Link, useNavigate } from "react-router-dom";
import { axiosRequest } from "../../utils/axiosRequest";
import { saveToken } from "../../utils/token";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);


  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      let user = {
        userName: userName,
        password: password,
      };
      const { data } = await axiosRequest.post("Account/login", user);
      console.log(data.data);
      saveToken(data.data);
      navigate("/basic");
    }
    catch (error) {

    }
  };

  return (
    <div className="py-[40px] h-[100vh] flex justify-center items-center">
      <img src={getImage.imgLogin} className="w-[auto] h-[620px]" alt="" />
      <div className="w-[380px] flex flex-wrap justify-center content-between h-[580px]">
        <div className="w-[350px] h-[400px] flex flex-wrap justify-center content-between border-[1px] border-gray-300 rounded-[5px]">
          <img src={getImage.logo} className="h-[51px] mt-[20px]" alt="" />
          <form
            onSubmit={handleLogin}
            className="w-[100%] flex flex-wrap justify-center content-start"
          >
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              className="w-[270px] h-[36px] rounded-[5px] border-[1px] border-gray-300 bg-[#e8f0fe] text-[12px] pl-[10px] outline-none"
              placeholder="Телефон, имя пользователя или эл. адрес"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show == true ? "text":"password"}
              className="w-[270px] h-[36px] rounded-[5px] border-[1px] border-gray-300 bg-[#e8f0fe] text-[12px] pl-[10px] mt-[10px] mb-[3px] outline-none"
              placeholder="Пароль"
            />
            <div className=" w-[270px] h-[36px] flex items-center gap-[5px]">
              <div>
                <input value={show} onChange={(e)=>setShow(e.target.checked)} type="checkbox" />
              </div>
              <div>
                <h1 className="text-[14px]">Show password </h1>
              </div>
            </div>
            <button

              type="submit"
              className="w-[270px] h-[36px] rounded-[5px] text-[white] bg-[#0095f6] font-bold"
            >
              Войти
            </button>
          </form>
          <div className="w-[90%] text-gray-500 text-center">или</div>
          <div className="w-[90%] text-center">
            <p className="text-[#385185] font-bold">Войти через Facebook</p>
            <p className="text-[#385185] text-[13px] my-[20px]">
              Забыли пароль?
            </p>
          </div>
        </div>
        <div className="w-[350px] h-[63px] flex justify-center items-center border-[1px] border-gray-300 rounded-[5px]">
          <p className="text-[14px]">
            У вас ещё нет аккаунта?{" "}
            <Link to="/registration">
              <span className="text-[#0095f6] font-bold">
                Зарегистрироваться
              </span>
            </Link>
          </p>
        </div>
        <div className="w-[100%] text-center">Установите приложение.</div>
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

export default Login;
