import React, { useEffect, useState } from "react";
import { Alert, PermissionsAndroid, View } from "react-native";
import { launchCamera } from "react-native-image-picker";
import { useSelector } from "react-redux";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import CmsLoading from "../../../components/cms/CmsLoading";
import CmsRoot from "../../../components/cms/CmsRoot";
import LogoHeaderBack from "../../../components/molecules/LogoHeaderBack";
import { navigate, navigationRef } from "../../../navigators/RootNavigation";
import { CMS_POLLING_DURATION } from "../../../services/constants";
import { useGetCmsQuery } from "../../../store/apiSlices/cmsApi";

const SubmitFeedback = () => {
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    Alert.alert(
      "Camera Permission Request",
      "We need Camera Permissions to record your story",
      [
        {
          text: "Cancel",
          onPress: () => navigationRef.goBack(),
          style: "cancel",
        },
        {
          text: "Okay",
          onPress: () =>
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA),
        },
      ]
    );
  }, []);

  const { unipeEmployeeId } = useSelector((state) => state.auth);
  const { data: cmsData, isLoading: cmsLoading } = useGetCmsQuery(
    unipeEmployeeId,
    {
      pollingInterval: CMS_POLLING_DURATION,
    }
  );

  const startRecording = () => {
    if (!recording) {
      const options = {
        mediaType: "video",
        videoQuality: "high",
      };

      launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log("Video recording cancelled");
        } else if (response.error) {
          console.log("Error recording video:", response.error);
        } else {
          console.log(
            "ELSE: ",
            response.assets[0].uri,
            response.assets[0].fileSize
          );
          navigate("AccountStack", {
            screen: "UploadFeedback",
            params: { videoUri: response.assets[0].uri },
          });
        }
      });
      setRecording(true);
    }
  };

  const DUMMYDATA = {
    data: [
      {
        type: "container",
        children: [
          {
            type: "subtitle",
            title: "Hi there! Share your story with us",
            styling: {
              fontSize: 22,
              textAlign: "center",
            },
          },
          {
            type: "image",
            url: "https://d22ss3ef1t9wna.cloudfront.net/dev/cms/2023-06-13/Blogs/KYC/WhatKYC.png",
            styling: {
              width: 200,
              height: 300,
              resizeMode: "contain",
              alignSelf: "center",
              marginTop: 40,
            },
          },
          {
            type: "markdown",
            content:
              "### Four Ways to Check your PF Balance\n#### 1. Online through the EPFO portal\n#### 1. Online through the EPFO portal\n#### 1. Online through the EPFO portal\n",
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
      <View style={{ padding: 20, flex: 1 }}>
        {!cmsData && cmsLoading ? (
          <CmsLoading />
        ) : (
          // <CmsRoot children={cmsData?.submitFeedback} />
          <CmsRoot children={DUMMYDATA.data} />
        )}
        <PrimaryButton
          containerStyle={{
            position: "absolute",
            bottom: 20,
          }}
          title="Record Video"
          onPress={startRecording}
        />
      </View>
    </View>
  );
};

export default SubmitFeedback;
