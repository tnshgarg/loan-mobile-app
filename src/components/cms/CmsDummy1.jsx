import React from "react";
import { useSelector } from "react-redux";
import { useGetCmsQuery } from "../../store/apiSlices/cmsApi";
import CmsRoot from "./CmsRoot";

const CmsDummy1 = ({ route }) => {
  console.log("route params: ", route.params.blogKey);
  const { unipeEmployeeId, token, onboarded } = useSelector(
    (state) => state.auth
  );

  const {
    data: cmsData,
    isLoading: cmsLoading,
    isError: cmsError,
  } = useGetCmsQuery(unipeEmployeeId, {
    pollingInterval: 1000,
  });

  const splittedString = route.params.blogKey.split(":");
  console.log("splittedString: ", splittedString);
  const [name, key] = splittedString;
  console.log("ssssss: ", cmsData?.blogs[key]);

  return !cmsLoading ? (
    <CmsRoot
      children={name == "blog" ? cmsData?.blogs[key] : cmsData?.home}
    ></CmsRoot>
  ) : (
    <></>
  );
};

export default CmsDummy1;
