import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addESICAddress } from "../../store/slices/esicSlice";
import FormInput from "../atoms/FormInput";
import DropDownForm from "./DropDownForm";

const customData = require("../../assets/state_districts.json");

export default AddressDropdown = (props) => {
  const [districts, setDistricts] = useState(["Please Choose a State"]);

  const dispatch = useDispatch();
  const states = Object.keys(customData);

  const [geoState, setGeoState] = useState(
    useSelector((state) => state.esic.address[props.type].state)
  );
  const [district, setDistrict] = useState(
    useSelector((state) => state.esic.address[props.type].district)
  );
  const [street, setStreet] = useState(
    useSelector((state) => state.esic.address[props.type].street)
  );

  const [pincode, setPincode] = useState(
    useSelector((state) => state.esic.address[props.type].pincode)
  );

  useEffect(() => {
    dispatch(
      addESICAddress({ type: props.type, subtype: "state", val: geoState })
    );
  }, [geoState]);

  useEffect(() => {
    dispatch(
      addESICAddress({ type: props.type, subtype: "street", val: street })
    );
  }, [street]);

  useEffect(() => {
    dispatch(
      addESICAddress({ type: props.type, subtype: "pincode", val: pincode })
    );
  }, [pincode]);

  useEffect(() => {
    dispatch(
      addESICAddress({
        type: props.type,
        subtype: "district",
        val: district,
      })
    );
  }, [district]);

  useEffect(() => {
    if (geoState) {
      setDistricts(customData[geoState]);
      console.log(geoState);
    }
  }, [geoState]);

  switch (props.type) {
    case "present":
      var title = "Present";
      break;
    case "permanent":
      var title = "Permanent";
      break;
    case "nominee":
      var title = "Nominee";
      break;
  }

  return (
    <>
      <FormInput
        placeholder={title + " Street"}
        value={street}
        onChange={setStreet}
      />
      <DropDownForm
        placeholder={title + " State"}
        value={geoState}
        setValue={setGeoState}
        data={states}
      />

      <DropDownForm
        placeholder={title + " District"}
        value={district}
        setValue={setDistrict}
        data={districts}
      />

      <FormInput
        placeholder={title + " Pincode"}
        value={pincode}
        onChange={setPincode}
      />
    </>
  );
};
