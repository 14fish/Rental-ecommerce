import React from "react";
import Loadable from "react-loadable";
import { Home } from "../containers/views";

const Loading = () => {
  return <div>Loading...</div>;
};

const SinglePost = Loadable({
  loader: () =>
    import("../containers/views").then((module) => module.SinglePost),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import("../containers/views").then((module) => module.Login),
  loading: Loading,
});

const Register = Loadable({
  loader: () => import("../containers/views").then((module) => module.Register),
  loading: Loading,
});

const NewAd = Loadable({
  loader: () => import("../containers/views").then((module) => module.NewAd),
  loading: Loading,
});

const Profile = Loadable({
  loader: () => import("../containers/views").then((module) => module.Profile),
  loading: Loading,
});

const EditAd = Loadable({
  loader: () => import("../containers/views").then((module) => module.EditAd),
  loading: Loading,
});

const Inbox = Loadable({
  loader: () => import("../containers/views").then((module) => module.Messages),
  loading: Loading,
});

export const routes = [
  { path: "/", name: "HomePage", component: Home, exact: true },
  { path: "/post/:id", name: "Single Post", component: SinglePost },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/new-ad", name: "New Advertisement", component: NewAd },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/post-edit/:id", name: "Edit Page", component: EditAd },
  { path: "/inbox", name: "Messages Page", component: Inbox },
];
