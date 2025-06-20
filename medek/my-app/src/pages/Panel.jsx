import React, { useEffect, useState } from "react";

import UserFiles from "../components/UserFiles"
import UserLessons from "../components/UserLessons"
import TimelineCard from "../components/TimelineCard"
import { useNavigate } from "react-router-dom";

import { logOut } from "../helpers/authHelpers"

import ProccessApi from '../apis/ProccessApi'
import SchoolApi from '../apis/SchoolApi'


export default function Panel() {

  const navigate = useNavigate()

  const role = ProccessApi.getUserRole();
  const userId = ProccessApi.getUserId();




  return (
    <div>
      <h2>Panel Sayfası</h2>

      {role === "TEACHER" && (<>
        <UserFiles userId={userId} />

        <UserLessons userId={userId} />
      </>)}

    </div>
  );
}