// import axios from "axios";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import CmsLoading from "../../../components/cms/CmsLoading";
import CmsRoot from "../../../components/cms/CmsRoot";
import LogoHeaderBack from "../../../components/molecules/LogoHeaderBack";
import VideoDisplayer from "../../../components/organisms/VideoDisplayer";
import { FONTS } from "../../../constants/Theme";
import { navigate, navigationRef } from "../../../navigators/RootNavigation";
import { CMS_POLLING_DURATION } from "../../../services/constants";
import { useGetCmsQuery } from "../../../store/apiSlices/cmsApi";

const UploadFeedback = ({ route }) => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const { videoUri } = route.params;

  const { unipeEmployeeId, token } = useSelector((state) => state.auth);
  const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
    unipeEmployeeId,
    {
      pollingInterval: CMS_POLLING_DURATION,
    }
  );

  const uploadVideo = async (videoUri) => {
    const formData = new FormData();
    formData.append("video", {
      uri: videoUri,
      type: "video/mp4",
      name: `${unipeEmployeeId}.mp4`,
      params: {
        unipeEmployeeId: unipeEmployeeId,
        token: token,
      },
    });

    console.log("Form data: ", formData);

    try {
      // const response = await axios
      //   .post(`${EMPLOYEE_API_URL}/userstory`, {
      //     params: {
      //       unipeEmployeeId: unipeEmployeeId,
      //       token: token,
      //       uri: videoUri,
      //       type: "video/mp4",
      //       name: `${unipeEmployeeId}.mp4`,
      //     },
      //   })
      //   .then((data) => console.log("Request made: ", data))
      //   .catch((error) => console.log("error occured: ", error));
      // console.log("Video uploaded successfully:", response.data);
      setFeedbackSubmitted(true);
    } catch (error) {
      console.log("Error uploading video:", error.toString());
    }
  };

  const DUMMYDATA = {
    data: [
      {
        type: "container",
        styling: {
          height: "100%",
        },
        children: [
          {
            type: "container",
            styling: {
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 150,
              padding: 20,
            },
            children: [
              {
                styling: {
                  // marginLeft: "-15%",
                  width: 300,
                  height: 300,
                  resizeMode: "contain",
                  alignSelf: "center",
                },
                type: "image",
                url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhatKYC.png",
              },
              {
                type: "title",
                title: "Your Feedback submitted successfully",
                styling: {
                  fontSize: 22,
                },
              },
              {
                type: "subtitle",
                title: "Thank you for submitting your valuable feedback",
              },
            ],
          },
        ],
      },
      {
        type: "container",
        styling: {
          padding: 20,
          position: "absolute",
          bottom: 40,
        },
        children: [
          {
            type: "button",
            title: "Done",
            variant: "filled",
            clickType: "navigation",
            navigate: {
              type: "app",
              stack: "HomeStack",
              screen: "Home",
            },
          },
        ],
      },
    ],
  };

  return (
    <View style={{ flex: 1 }}>
      <LogoHeaderBack
        title={"Submit your feedback"}
        onLeftIconPress={() => navigationRef.goBack()}
      />
      <VideoDisplayer videoUri={videoUri} />

      {videoUri && (
        <View
          style={{
            paddingHorizontal: 20,
            position: "absolute",
            bottom: 0,
            zIndex: 100,
            width: "100%",
            paddingBottom: 10,
          }}
        >
          <PrimaryButton title="Submit" onPress={() => uploadVideo(videoUri)} />
          <TouchableOpacity
            onPress={() => {
              navigate("AccountStack", {
                screen: "SubmitFeedback",
              });
            }}
          >
            <Text
              style={{
                color: "white",
                ...FONTS.h3,
                alignSelf: "center",
                marginTop: 13,
              }}
            >
              Retake
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        isVisible={feedbackSubmitted}
        style={{
          flex: 1,
          backgroundColor: "white",
          margin: 0,
          padding: 0,
          justifyContent: "flex-start",
        }}
      >
        <LogoHeaderBack
          title={"Feedback"}
          onLeftIconPress={() => navigationRef.goBack()}
        />
        {!cmsData && cmsLoading ? (
          <CmsLoading />
        ) : (
          <CmsRoot children={DUMMYDATA.data} />
        )}
      </Modal>
    </View>
  );
};

export default UploadFeedback;
