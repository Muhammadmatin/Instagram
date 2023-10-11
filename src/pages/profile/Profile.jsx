import React, { useEffect, useState } from "react";
import { getImage } from "../../images/getImage";
import SettingsIcon from "@mui/icons-material/Settings";
import ProfileTabs from "../../components/profileTab/ProfileTabs";
import BasicTabs from "../../components/profileTab/ProfileTabs";
import "../pages.css";
import { axiosRequest } from "../../utils/axiosRequest";
import { getToken } from "../../utils/token";

import "./profile.css";
import { Link } from "react-router-dom";
const Profile = () => {
  const myid = getToken().sid;
  const myAvatar = getToken().sub;

  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState({});
  const [information, setInformation] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [option, setOption] = useState(false);

  function openModal() {
    setOption(true);
  }
  function closeModal() {
    setOption(false);
  }

  //  GET Profile
  async function getProfile() {
    try {
      const { data } = await axiosRequest.get(
        `User/get-User-by-id?userId=${myid}`
      );
      setProfile(data.data);
    } catch (error) {}
  }

  // GEt Post for my photo
  async function getPosts() {
    try {
      const { data } = await axiosRequest.get("Post/get-posts");
      setPosts(data.data);
    } catch (error) {}
  }

  // Get following
  async function getFollowing() {
    try {
      const { data } = await axiosRequest.get(`UserProfile/CounterProfile`);
      setFollowing(data.data);
    } catch (error) {}
  }

  // get more information
  async function getInfo() {
    try {
      const { data } = await axiosRequest.get(
        `UserProfile/get-UserProfile-by-id?id=${myid}`
      );
      setInformation(data.data);
      setAvatar(data.data.image);
    } catch (error) {}
  }

  useEffect(() => {
    getProfile();
    getPosts();
    getFollowing();
    getInfo();
  }, []);

  return (
    <div className="ml-[17.2%] py-[25px] flex flex-wrap justify-center items-start">
      <div className="w-[975px] flex flex-wrap justify-center content-start">
        <div className="w-[100%] h-[200px] flex justify-center items-start">
          <div className="w-[300px] h-[150px] flex justify-center items-center">
            <div className="w-[160px] h-[160px] gradient rounded-[50%] flex justify-center items-center">
              <div className="w-[156px] h-[156px] bg-[white] rounded-[50%] flex justify-center items-center">
                <div className="w-[150px] h-[150px] rounded-[50%] flex justify-center items-center overflow-hidden">
                  <img
                    src={`http://65.108.148.136:8085/images/${avatar}`}
                    className="w-[100%] h-[100%]"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[613px] h-[150px]">
            <div className="w-[100%] flex justify-start items-center">
              <p className="text-[18px] font-bold">{profile.userName}</p>
              <Link to="/basic/accountEdit">
                <button className="w-[203px] h-[32px] bg-[#efefef] rounded-[5px] ml-[20px] font-bold text-[14px]">
                  <p>Редактировать профиль</p>
                </button>
              </Link>
              <button className="w-[143px] h-[32px] bg-[#efefef] rounded-[5px] ml-[10px] font-bold text-[14px]">
                <p>Показать архив</p>
              </button>
              <button onClick={() => openModal()} className="ml-[10px]">
                <SettingsIcon style={{ fontSize: "30px" }} />
              </button>
            </div>
            <div className="w-[100%] flex mt-[30px]">
              <p className="text-[16px]">
                <span className="font-bold"></span> {following.post} Публикаций
              </p>
              <p className="text-[16px] mx-[40px]">
                <span className="font-bold"></span> {following.follower}{" "}
                Подписчиков
              </p>
              <p className="text-[16px]">
                <span className="font-bold">{following.following}</span>{" "}
                подписок
              </p>
            </div>
            <div className="mt-[10px]">
              <p className="inline">{information.firstName}</p>
              <p className="inline ml-[10px]">{information.lastName}</p>
              <p>{information.occupation}</p>
              <p>{information.about}</p>
            </div>
          </div>
        </div>
        <BasicTabs />
        <div className="w-[100%]">
          <div className="w-[100%] flex flex-wrap justify-between text-[12px] text-gray-500">
            <p>Meta</p>
            <p className="mx-[10px]">Information</p>
            <p>Blog</p>
            <p className="mx-[10px]">Vacation</p>
            <p>Help</p>
            <p className="mx-[10px]">API</p>
            <p>Confidation</p>
            <p className="mx-[10px]">Условия</p>
            <p>Места</p>
            <p className="mx-[10px]">Instagram Life</p>
            <p>Threads</p>
            <p className="mx-[10px]">
              Загрузка контактов и лица, не являющиеся пользователями
            </p>
            <p>Meta Verified</p>
          </div>
          <div className="w-[100%] flex justify-center text-[12px] text-gray-500">
            <p>Russian</p>
            <p className="mx-[10px]">© 2023 Instagram from Meta</p>
          </div>
        </div>
      </div>

      {option ? (
        <div className="modal dark:text-black ">
          <div className="modal-content rounded-[20px] text-center">
            <p className="mt-[10px] p-[10px]">Приложение и сайты</p>
            <hr />
            <p className="mt-[10px] p-[10px]">QR-код</p>
            <hr />
            <p className="mt-[10px] p-[10px]">Уведомления</p>
            <hr />
            <p className="mt-[10px] p-[10px]">
              Настройки и конфенденциальность
            </p>
            <hr />
            <p className="mt-[10px] p-[10px]">Контроль</p>
            <hr />
            <p className="mt-[10px] p-[10px]">Выйти</p>
            <hr />
            <button className="p-[10px]" onClick={() => closeModal()}>
              Отмена
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
