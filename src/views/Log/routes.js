import React from "react";
import PropTypes from "prop-types";
import { Routes } from "../../components";

const LogRoutes = ({ routes }) => {
  return <Routes routes={routes} />;
};

export default LogRoutes;

LogRoutes.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
};
