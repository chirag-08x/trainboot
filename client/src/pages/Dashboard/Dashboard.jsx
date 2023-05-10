import { useAuth0 } from "@auth0/auth0-react";
import { heroSidebarLinks } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import axios from "axios";
import { v4 as uid } from "uuid";

const Dashboard = () => {
  const { logout, user } = useAuth0();
  const [videoDetails, setVideoDetails] = useState([]);
  const [trainngsAnalysis, setTrainngsAnalysis] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getVideos = async () => {
      const { data } = await axios.get(
        "https://trainboot-server.onrender.com/trainings/all"
      );
      console.log(data);
      setVideoDetails([...data]);
    };
    getVideos();
  }, []);

  useEffect(() => {
    const getAnalysis = async () => {
      const { data } = await axios.get(
        `https://trainboot-server.onrender.com/employees/getOne/${user.email}`
      );
      setTrainngsAnalysis({ ...data });
    };
    getAnalysis();
  }, []);

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const { data } = await axios.get(
          "https://trainboot-server.onrender.com/announcements/all"
        );
        setAnnouncements(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAnnouncements();
  }, []);

  const handleStartTraining = async (tid) => {
    try {
      await axios.post(
        "https://trainboot-server.onrender.com/trainings/startTraining",
        { email: user.email, id: tid }
      );
      navigate(`/dashboard/${tid}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen	">
      <section className="grid grid-cols-[250px_1fr]">
        <aside className="bg-black h-full min-h-screen py-10 px-4 grid gap-y-14 content-start sticky top-0 left-0">
          <div>
            <svg
              width="163"
              height="30"
              viewBox="0 0 163 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9067 4.36644V0H0V30H13.9067V25.6336C11.0579 25.6336 8.32575 24.5132 6.3114 22.519C4.297 20.5248 3.16533 17.8202 3.16533 15C3.16533 12.1798 4.297 9.47508 6.3114 7.48094C8.32575 5.48676 11.0579 4.36644 13.9067 4.36644Z"
                fill="white"
              />
              <path
                d="M13.9062 4.36646V25.6336C16.755 25.6336 19.4871 24.5132 21.5015 22.519C23.5159 20.5249 24.6476 17.8202 24.6476 15C24.6476 12.1798 23.5159 9.47509 21.5015 7.48096C19.4871 5.48678 16.755 4.36646 13.9062 4.36646Z"
                fill="white"
              />
              <path
                d="M31.1476 12.6477V10.3636H40.9828V12.6477H37.4544V22H34.6817V12.6477H31.1476ZM40.9701 22V13.2727H43.669V14.8636H43.7599C43.919 14.2879 44.1785 13.8598 44.5383 13.5795C44.8982 13.2955 45.3167 13.1534 45.794 13.1534C45.9228 13.1534 46.0554 13.1629 46.1917 13.1818C46.3281 13.197 46.455 13.2216 46.5724 13.2557V15.6705C46.4398 15.625 46.2656 15.589 46.0497 15.5625C45.8376 15.536 45.6482 15.5227 45.4815 15.5227C45.152 15.5227 44.8546 15.5966 44.5895 15.7443C44.3281 15.8883 44.1217 16.0909 43.9701 16.3523C43.8224 16.6098 43.7485 16.9129 43.7485 17.2614V22H40.9701ZM49.3566 22.1477C48.7998 22.1477 48.3055 22.0549 47.8737 21.8693C47.4456 21.6799 47.1066 21.3958 46.8566 21.017C46.6104 20.6345 46.4873 20.1553 46.4873 19.5795C46.4873 19.0947 46.5725 18.6856 46.743 18.3523C46.9134 18.0189 47.1483 17.7481 47.4475 17.5398C47.7468 17.3314 48.0915 17.1742 48.4816 17.0682C48.8718 16.9583 49.2884 16.8845 49.7316 16.8466C50.2278 16.8011 50.6275 16.7538 50.9305 16.7045C51.2335 16.6515 51.4532 16.5777 51.5896 16.483C51.7297 16.3845 51.7998 16.2462 51.7998 16.0682V16.0398C51.7998 15.7481 51.6994 15.5227 51.4987 15.3636C51.2979 15.2045 51.0271 15.125 50.6862 15.125C50.3187 15.125 50.0233 15.2045 49.7998 15.3636C49.5763 15.5227 49.4343 15.7424 49.3737 16.0227L46.8112 15.9318C46.8869 15.4015 47.082 14.928 47.3964 14.5114C47.7146 14.0909 48.1502 13.7614 48.7032 13.5227C49.26 13.2803 49.9286 13.1591 50.7089 13.1591C51.2657 13.1591 51.779 13.2254 52.2487 13.358C52.7184 13.4867 53.1275 13.6761 53.4759 13.9261C53.8244 14.1723 54.0934 14.4754 54.2828 14.8352C54.4759 15.1951 54.5725 15.6061 54.5725 16.0682V22H51.9589V20.7841H51.8907C51.7354 21.0795 51.5365 21.3295 51.2941 21.5341C51.0555 21.7386 50.7733 21.892 50.4475 21.9943C50.1256 22.0966 49.7619 22.1477 49.3566 22.1477ZM50.2146 20.3295C50.5138 20.3295 50.7828 20.2689 51.0214 20.1477C51.2638 20.0265 51.457 19.8598 51.6009 19.6477C51.7449 19.4318 51.8168 19.1818 51.8168 18.8977V18.0682C51.7373 18.1098 51.6407 18.1477 51.5271 18.1818C51.4172 18.2159 51.296 18.2481 51.1634 18.2784C51.0309 18.3087 50.8945 18.3352 50.7543 18.358C50.6142 18.3807 50.4797 18.4015 50.3509 18.4205C50.0896 18.4621 49.8661 18.5265 49.6805 18.6136C49.4987 18.7008 49.3585 18.8144 49.26 18.9545C49.1653 19.0909 49.118 19.2538 49.118 19.4432C49.118 19.7311 49.2203 19.9508 49.4248 20.1023C49.6331 20.2538 49.8964 20.3295 50.2146 20.3295ZM55.7914 22V13.2727H58.5698V22H55.7914ZM57.1834 12.2557C56.7933 12.2557 56.4581 12.1269 56.1778 11.8693C55.8974 11.608 55.7573 11.2936 55.7573 10.9261C55.7573 10.5625 55.8974 10.2519 56.1778 9.99432C56.4581 9.73295 56.7933 9.60227 57.1834 9.60227C57.5774 9.60227 57.9126 9.73295 58.1891 9.99432C58.4694 10.2519 58.6096 10.5625 58.6096 10.9261C58.6096 11.2936 58.4694 11.608 58.1891 11.8693C57.9126 12.1269 57.5774 12.2557 57.1834 12.2557ZM62.6367 17.0227V22H59.8583V13.2727H62.5003V14.875H62.5969C62.7901 14.3409 63.1196 13.9223 63.5855 13.6193C64.0514 13.3125 64.6064 13.1591 65.2503 13.1591C65.8639 13.1591 66.3961 13.2973 66.8469 13.5739C67.3014 13.8466 67.6537 14.2292 67.9037 14.7216C68.1575 15.2102 68.2825 15.7822 68.2787 16.4375V22H65.5003V16.983C65.5041 16.4981 65.381 16.1193 65.131 15.8466C64.8848 15.5739 64.542 15.4375 64.1026 15.4375C63.8109 15.4375 63.5533 15.5019 63.3299 15.6307C63.1102 15.7557 62.9397 15.9356 62.8185 16.1705C62.7011 16.4053 62.6405 16.6894 62.6367 17.0227ZM69.5189 22V10.3636H74.3712C75.2424 10.3636 75.9715 10.4867 76.5587 10.733C77.1496 10.9792 77.5928 11.3239 77.8882 11.767C78.1874 12.2102 78.3371 12.7235 78.3371 13.3068C78.3371 13.75 78.2443 14.1458 78.0587 14.4943C77.8731 14.839 77.6174 15.125 77.2916 15.3523C76.9659 15.5795 76.589 15.7386 76.1609 15.8295V15.9432C76.6306 15.9659 77.0643 16.0928 77.4621 16.3239C77.8636 16.5549 78.1856 16.8769 78.428 17.2898C78.6704 17.6989 78.7916 18.1837 78.7916 18.7443C78.7916 19.3693 78.6325 19.928 78.3143 20.4205C77.9962 20.9091 77.5359 21.2955 76.9337 21.5795C76.3314 21.8598 75.6003 22 74.7405 22H69.5189ZM72.3314 19.733H74.07C74.6799 19.733 75.1287 19.6174 75.4166 19.3864C75.7083 19.1553 75.8541 18.8333 75.8541 18.4205C75.8541 18.1212 75.784 17.8636 75.6439 17.6477C75.5037 17.428 75.3049 17.2595 75.0473 17.142C74.7897 17.0208 74.481 16.9602 74.1212 16.9602H72.3314V19.733ZM72.3314 15.1477H73.8882C74.195 15.1477 74.4678 15.0966 74.7064 14.9943C74.945 14.892 75.1306 14.7443 75.2632 14.5511C75.3996 14.358 75.4678 14.125 75.4678 13.8523C75.4678 13.4621 75.3295 13.1553 75.053 12.9318C74.7765 12.7083 74.4034 12.5966 73.9337 12.5966H72.3314V15.1477ZM83.7378 22.1648C82.8211 22.1648 82.0332 21.9773 81.3741 21.6023C80.7188 21.2235 80.2131 20.697 79.8571 20.0227C79.5048 19.3447 79.3287 18.5587 79.3287 17.6648C79.3287 16.767 79.5048 15.9811 79.8571 15.3068C80.2131 14.6288 80.7188 14.1023 81.3741 13.7273C82.0332 13.3485 82.8211 13.1591 83.7378 13.1591C84.6544 13.1591 85.4404 13.3485 86.0957 13.7273C86.7548 14.1023 87.2605 14.6288 87.6128 15.3068C87.9688 15.9811 88.1468 16.767 88.1468 17.6648C88.1468 18.5587 87.9688 19.3447 87.6128 20.0227C87.2605 20.697 86.7548 21.2235 86.0957 21.6023C85.4404 21.9773 84.6544 22.1648 83.7378 22.1648ZM83.7548 20.0682C84.0881 20.0682 84.3703 19.9659 84.6014 19.7614C84.8324 19.5568 85.0086 19.2727 85.1298 18.9091C85.2548 18.5455 85.3173 18.125 85.3173 17.6477C85.3173 17.1629 85.2548 16.7386 85.1298 16.375C85.0086 16.0114 84.8324 15.7273 84.6014 15.5227C84.3703 15.3182 84.0881 15.2159 83.7548 15.2159C83.4101 15.2159 83.1184 15.3182 82.8798 15.5227C82.6449 15.7273 82.465 16.0114 82.34 16.375C82.2188 16.7386 82.1582 17.1629 82.1582 17.6477C82.1582 18.125 82.2188 18.5455 82.34 18.9091C82.465 19.2727 82.6449 19.5568 82.8798 19.7614C83.1184 19.9659 83.4101 20.0682 83.7548 20.0682ZM93.164 22.1648C92.2473 22.1648 91.4595 21.9773 90.8004 21.6023C90.1451 21.2235 89.6394 20.697 89.2833 20.0227C88.931 19.3447 88.7549 18.5587 88.7549 17.6648C88.7549 16.767 88.931 15.9811 89.2833 15.3068C89.6394 14.6288 90.1451 14.1023 90.8004 13.7273C91.4595 13.3485 92.2473 13.1591 93.164 13.1591C94.0807 13.1591 94.8667 13.3485 95.522 13.7273C96.181 14.1023 96.6867 14.6288 97.039 15.3068C97.3951 15.9811 97.5731 16.767 97.5731 17.6648C97.5731 18.5587 97.3951 19.3447 97.039 20.0227C96.6867 20.697 96.181 21.2235 95.522 21.6023C94.8667 21.9773 94.0807 22.1648 93.164 22.1648ZM93.181 20.0682C93.5144 20.0682 93.7966 19.9659 94.0276 19.7614C94.2587 19.5568 94.4348 19.2727 94.556 18.9091C94.681 18.5455 94.7435 18.125 94.7435 17.6477C94.7435 17.1629 94.681 16.7386 94.556 16.375C94.4348 16.0114 94.2587 15.7273 94.0276 15.5227C93.7966 15.3182 93.5144 15.2159 93.181 15.2159C92.8364 15.2159 92.5447 15.3182 92.306 15.5227C92.0712 15.7273 91.8913 16.0114 91.7663 16.375C91.6451 16.7386 91.5845 17.1629 91.5845 17.6477C91.5845 18.125 91.6451 18.5455 91.7663 18.9091C91.8913 19.2727 92.0712 19.5568 92.306 19.7614C92.5447 19.9659 92.8364 20.0682 93.181 20.0682ZM103.443 13.2727V15.3182H97.9368V13.2727H103.443ZM99.0903 11.1818H101.869V19.2557C101.869 19.4261 101.895 19.5644 101.948 19.6705C102.005 19.7727 102.086 19.8466 102.193 19.892C102.299 19.9337 102.425 19.9545 102.573 19.9545C102.679 19.9545 102.791 19.9451 102.908 19.9261C103.03 19.9034 103.121 19.8845 103.181 19.8693L103.602 21.875C103.469 21.9129 103.282 21.9602 103.039 22.017C102.8 22.0739 102.514 22.1098 102.181 22.125C101.53 22.1553 100.971 22.0795 100.505 21.8977C100.043 21.7121 99.6887 21.4242 99.4425 21.0341C99.2001 20.6439 99.0827 20.1534 99.0903 19.5625V11.1818Z"
                fill="white"
              />
            </svg>
          </div>

          <div>
            <ul className="grid gap-y-8">
              {heroSidebarLinks.map(({ id, name, icon, href }) => {
                return (
                  <li key={id} className="flex items-center gap-x-4 text-lg">
                    {icon}
                    <Link to={href}>{name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <section className="bg-grey-primary">
          <nav className="bg-white flex justify-between py-6 px-8">
            <div className="flex items-center gap-x-5">
              <button className="text-2xl">
                <AiOutlineAlignLeft />
              </button>
              <p className="capitalize">Hi, {user.given_name}</p>
            </div>

            <button
              className="btn text-white"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              logout
            </button>
          </nav>

          <div className="py-4 px-8">
            <div className="grid grid-cols-3 gap-x-5 mb-20">
              <div className="bg-white rounded-xl px-5 py-8">
                <div className="flex items-center gap-x-4">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="48"
                      height="48"
                      rx="24"
                      fill="url(#paint0_linear_106_1300)"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15 17C15 15.8954 15.8954 15 17 15H31C32.1046 15 33 15.8954 33 17V31C33 32.1046 32.1046 33 31 33H17C15.8954 33 15 32.1046 15 31V17ZM17 17H19V18C19 19.6568 20.3432 21 22 21H26C27.6569 21 29 19.6568 29 18V17H31V31H17V17ZM21 18V17H27V18C27 18.5523 26.5523 19 26 19H22C21.4477 19 21 18.5523 21 18ZM20 23C19.4477 23 19 23.4477 19 24C19 24.5523 19.4477 25 20 25H27.9595C28.5118 25 28.9595 24.5523 28.9595 24C28.9595 23.4477 28.5118 23 27.9595 23H20ZM20.0405 27.0665C19.4882 27.0665 19.0405 27.5142 19.0405 28.0665C19.0405 28.6188 19.4882 29.0665 20.0405 29.0665H28C28.5523 29.0665 29 28.6188 29 28.0665C29 27.5142 28.5523 27.0665 28 27.0665H20.0405Z"
                      fill="white"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_106_1300"
                        x1="48"
                        y1="0"
                        x2="0"
                        y2="48"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#BB65FF" />
                        <stop offset="1" stopColor="#4C6FFF" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div>
                    <h1 className="text-3xl">
                      {trainngsAnalysis.trngsCompleted}
                    </h1>
                    <p className="text-sm text-grey-secondary">
                      Trainings Completed
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl px-4 py-8">
                <div className="flex items-center gap-x-4">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="48"
                      height="48"
                      rx="24"
                      fill="url(#paint0_linear_106_1325)"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M31 21C31 23.3787 29.8135 25.4804 28 26.7453V34H25.4142L24 32.5858L22.5858 34H20V26.7453C18.1865 25.4804 17 23.3787 17 21C17 17.134 20.134 14 24 14C27.866 14 31 17.134 31 21ZM29 21C29 23.7614 26.7614 26 24 26C21.2386 26 19 23.7614 19 21C19 18.2386 21.2386 16 24 16C26.7614 16 29 18.2386 29 21ZM22 31.7573L24 29.7573L26 31.7574V27.7101C25.3663 27.8987 24.695 28 24 28C23.305 28 22.6337 27.8987 22 27.7101V31.7573Z"
                      fill="white"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_106_1325"
                        x1="48"
                        y1="0"
                        x2="0"
                        y2="48"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFA674" />
                        <stop offset="1" stopColor="#FF3737" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div>
                    <h1 className="text-3xl">
                      {trainngsAnalysis.tasksCompleted}
                    </h1>
                    <p className="text-sm text-grey-secondary">
                      Tasks Completed
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl px-4 py-8">
                <div className="flex items-center gap-x-4">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="48"
                      height="48"
                      rx="24"
                      fill="url(#paint0_linear_106_1342)"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.4142 28.4322L12 27.018L19.0711 19.9469L25.435 26.3109L29.6777 22.0682L27.9353 20.3259L34.6274 18.5327L32.8343 25.2248L31.0919 23.4825L25.435 29.1393L19.0711 22.7754L13.4142 28.4322Z"
                      fill="white"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_106_1342"
                        x1="48"
                        y1="0"
                        x2="0"
                        y2="48"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FF974D" />
                        <stop offset="1" stopColor="#FFE925" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div>
                    <h1 className="text-3xl">
                      {trainngsAnalysis.trngsOngoing}
                    </h1>
                    <p className="text-sm text-grey-secondary">
                      Trainings in Progress
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[3fr_1fr] gap-x-10">
              <div>
                <h1 className="text-xl mb-5 text-[#1E1E1E]">Trainings</h1>

                <div className="flex flex-col gap-y-4">
                  {videoDetails.map(
                    ({ _id, name, instructor, thumbnail, duration }) => {
                      return (
                        <div
                          key={_id}
                          className="flex bg-white gap-x-4 rounded-lg p-2"
                        >
                          <img
                            className="w-48 rounded-lg object-cover"
                            src={thumbnail}
                            alt=""
                          />
                          <div className="flex flex-col gap-y-2">
                            <p className="text-md font-semibold">{name}</p>
                            <p className="text-grey-secondary text-sm">
                              Instructor: {instructor}
                            </p>
                            <p className="text-grey-secondary text-sm">
                              Duration : {duration}
                            </p>
                            <button
                              // to={`/dashboard/${training_id}`}
                              className="bg-[#102844] text-white w-52 rounded-2xl mt-1 py-2 text-md text-center"
                              onClick={() => handleStartTraining(_id)}
                            >
                              Start Training
                            </button>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div>
                <h1 className="text-xl mb-5 text-[#1E1E1E]">Announcements</h1>
                <div className="flex flex-col gap-y-8 bg-white rounded-xl p-4">
                  {announcements.length > 0 ? (
                    announcements.map(({ date, title }, index) => {
                      return (
                        <div key={uid()} className=" flex items-center gap-x-4">
                          <div
                            className={`${
                              index % 2 === 0
                                ? "bg-blue-secondary"
                                : "bg-[#FFE4E4]"
                            } py-4 px-5 rounded-lg`}
                          >
                            <CgNotes className="text-xl" />
                          </div>
                          <div>
                            <p>{title}</p>
                            <p className="text-xs text-grey-secondary">
                              {date}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h2>No announcements yet</h2>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
