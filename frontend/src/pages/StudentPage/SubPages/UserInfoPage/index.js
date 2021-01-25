import React, { useState, useEffect } from "react";
import "./userinfopage.scss";
import { MdEdit, MdCheck, MdClose } from "react-icons/md";
import axios from "axios";
import header from "../../../../services/auth-header";
import API_URL from "../../../../services/API_URL";
import Skeleton from "../../../../components/Skeleton";

const data = {
  wydzial: "Informatyki",
  kierunek: "Informatyka",
  specjalizacja: "ISI",
  semestr: 5,
  tel: "123456789",
  email: "mail@mail.to",
};

const config = {
  headers: header(),
};

const changeValues = (email, phone) => {
  axios.post(API_URL + "updateData", { email: email, phone: phone }, config);
};

const UserInfoPage = () => {
  const [isPhoneEdit, setIsPhoneEdit] = useState(false);
  const [isEmailEdit, setIsEmailEdit] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(API_URL + "dataUser", config).then((response) => {
      setData(response.data.user_data);
      setPhoneValue(response.data.user_data.phone);
      setEmailValue(response.data.user_data.email);
    });
  }, []);

  return (
    <div className="userinfopage">
      <h1>Dane studenta</h1>
      <div className="userinfopage-container">
        {data ? (
          <>
            <div className="userinfopage-info">
              <p>
                <span>Wydział: </span>
                {data.faculty}
              </p>
              <p>
                <span>Kierunek: </span>
                {data.field_of_study}
              </p>
              <p>
                <span>Specjalizacja: </span>
                {data.specialization}
              </p>
              <p>
                <span>Semestr: </span>
                {data.semester}
              </p>
            </div>
            <div className="userinfopage-info changable">
              <p>
                <span>Nr. telefonu: </span>
                {!isPhoneEdit ? (
                  <>
                    {phoneValue}
                    <MdEdit
                      className="icon edit"
                      onClick={() => setIsPhoneEdit(!isPhoneEdit)}
                    />{" "}
                  </>
                ) : (
                  <>
                    <input
                      type="number"
                      value={phoneValue}
                      min={100}
                      max={999999999}
                      onChange={(e) => setPhoneValue(e.target.value)}
                    />
                    <MdClose
                      className="icon close"
                      onClick={() => {
                        setPhoneValue(phoneValue);
                        setIsPhoneEdit(!isPhoneEdit);
                      }}
                    />
                    <MdCheck
                      className="icon check"
                      onClick={() => {
                        changeValues(emailValue, phoneValue);
                        setIsPhoneEdit(!isPhoneEdit);
                      }}
                    />
                  </>
                )}
              </p>
              <p>
                <span>Email: </span>
                {!isEmailEdit ? (
                  <>
                    {emailValue}
                    <MdEdit
                      className="icon edit"
                      onClick={() => setIsEmailEdit(!isEmailEdit)}
                    />{" "}
                  </>
                ) : (
                  <>
                    <input
                      type="email"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                    />
                    <MdClose
                      className="icon close"
                      onClick={() => {
                        setEmailValue(emailValue);
                        setIsEmailEdit(!isEmailEdit);
                      }}
                    />
                    <MdCheck
                      className="icon check"
                      onClick={() => {
                        changeValues(emailValue, phoneValue);
                        setIsEmailEdit(!isEmailEdit);
                      }}
                    />
                  </>
                )}
              </p>
            </div>
          </>
        ) : (
          <Skeleton count={6} />
        )}
      </div>
    </div>
  );
};

export default function index(props) {
  return <UserInfoPage {...props} />;
}
