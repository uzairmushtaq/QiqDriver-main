import React, { useEffect, useRef, useState } from "react";
import {
  View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from 'react-redux';
import DropdownAlert, {
  DropdownAlertData,
  DropdownAlertType,
} from 'react-native-dropdownalert';
import axios from 'axios';
import { normal, bold, img_url, api_url, get_documents, upload_icon, id_proof_icon, vehicle_certificate_icon, vehicle_insurance_icon, vehicle_image_icon, f_xl, f_l, f_xs, f_s, f_m } from '../config/Constants';
import Icon, { Icons } from '../components/Icons';
import * as colors from '../assets/css/Colors';

const VehicleDocument = (props) => {
  const navigation = useNavigation();
  let alt = useRef(
    (_data?: DropdownAlertData) => new Promise<DropdownAlertData>(res => res),
  );
  const [loading, setLoading] = useState(false);
  const [id_proof, setIdProof] = useState({
    path: id_proof_icon,
    status: 0,
    status_name: "Waiting for upload",
    color: colors.warning
  });
  const [vehicle_certificate, setVehicleCertificate] = useState({
    path: vehicle_certificate_icon,
    status: 0,
    status_name: "Waiting for upload",
    color: colors.warning
  });
  const [vehicle_insurance, setVehicleInsurance] = useState({
    path: vehicle_insurance_icon,
    status: 0,
    status_name: "Waiting for upload",
    color: colors.warning
  });
  const [vehicle_image, setVehicleImage] = useState({
    path: vehicle_image_icon,
    status: 0,
    status_name: "Waiting for upload",
    color: colors.warning
  });
  const [vehicle_id, setVehicleId] = useState(0);
  const [upload_status, setUploadStatus] = useState(0);

  useEffect(() => {
    subscribe = navigation.addListener("focus", async () => {
      call_get_documents();
    });
    return subscribe;
  }, []);
  

  axios.interceptors.request.use(async function (config) {
    // Do something before request is sent
    //console.log("loading")
    setLoading(true);
    return config;
    }, function (error) {
          console.log(error)
          setLoading(false);
          console.log("finish loading")
          // Do something with request error
        return Promise.reject(error);
  })

  const find_document = (list) => {
    list.map((data, index) => {
      let value = { path: { uri: img_url + data.path }, status: data.status, status_name: data.status_name, color: get_status_foreground(data.status) }
      if (data.document_name == 'id_proof') {
        setIdProof(value);
      } else if (data.document_name == 'vehicle_certificate') {
        setVehicleCertificate(value);
      } else if (data.document_name == 'vehicle_image') {
        setVehicleImage(value);
      } else if (data.document_name == 'vehicle_insurance') {
        setVehicleInsurance(value);
      }
    })
  }

  const get_status_foreground = (status) => {
    if (status == 17) {
      return colors.error
    } else if (status == 14 || status == 15) {
      return colors.warning
    } else if (status == 16) {
      return colors.success
    }
  }

  const move_to_upload = (slug, status, path) => {
    let table = slug == "id_proof" ? "drivers" : "driver_vehicles";
    let find_field = slug == "id_proof" ? "id" : "id";
    let find_value = slug == "id_proof" ? global.id : vehicle_id;
    let status_field = slug == "id_proof" ? 'id_proof_status' : slug + '_status';
    if (status == 14) {
      navigation.navigate("DocumentUpload", { slug: slug, path: upload_icon, status: status, table: table, find_field: find_field, find_value: find_value, status_field: status_field });
    } else {
      navigation.navigate("DocumentUpload", { slug: slug, path: path, status: status, table: table, find_field: find_field, find_value: find_value, status_field: status_field });
    }
  }

  const go_back = () => {
    navigation.navigate('Home');
  }
  
  const call_get_documents = async () => {
   
    await axios({
      method: 'post',
      url: api_url + get_documents,
      data: { driver_id: global.id, lang: global.lang }
    })
      .then(async response => {
        setLoading(false);
        setVehicleId(response.data.result.details.vehicle_id);
        if (response.data.result.documents[0].status == 15 && response.data.result.documents[1].status == 15 && response.data.result.documents[2].status == 15 && response.data.result.documents[3].status == 15) {
          setUploadStatus(1);
        } else {
          find_document(response.data.result.documents)
        }
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        alt({
          type: DropdownAlertType.Error,
          title: 'Error',
          message: 'Sorry something went wrong',
        });
        
      });
  }

 
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        backgroundColor={colors.theme_bg}
      />
      <View style={[styles.header]}>
        <TouchableOpacity activeOpacity={1} onPress={go_back.bind(this)} style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>
          <Icon type={Icons.MaterialIcons} name="arrow-back" color={colors.theme_fg_two} style={{ fontSize: 30 }} />
        </TouchableOpacity>
      </View>
      {upload_status == 0 ?
        <View style={{ padding: 10 }}>
          <View>
            <Text style={{ fontFamily: bold, color: colors.theme_fg, fontSize: f_xl }}>
              Upload your documents (4)
            </Text>
            <View style={{ margin: 5 }} />
          </View>
          <View style={{ margin: 10 }} />
          <View>
            <Text style={{ fontFamily: bold, color: colors.theme_fg_two, fontSize: f_l }}>
              Id proof
            </Text>
            <Text style={{ fontFamily: normal, color: colors.grey, fontSize: f_xs }}>
              Make sure that every details of the document is clearly visible
            </Text>
            <View style={{ margin: 10 }} />
            <TouchableOpacity onPress={move_to_upload.bind(this, 'id_proof', id_proof.status, id_proof.path)} activeOpacity={1} style={{ borderWidth: 1, padding: 10, borderRadius: 5, borderStyle: 'dashed', flexDirection: 'row' }}>
              <View style={{ width: '70%' }}>
                <Text style={{ fontFamily: bold, color: id_proof.color, fontSize: f_s }}>{id_proof.status_name}</Text>
                <View style={{ margin: 5 }} />
                <Text style={{ fontFamily: normal, color: colors.grey, fontSize: f_xs }}>Upload your passport or driving licence or any one id proof</Text>
              </View>
              <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={id_proof.path} style={{ height: 75, width: 75 }} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ margin: 10 }} />
          <View>
            <Text style={{ fontFamily: bold, color: colors.theme_fg_two, fontSize: f_l }}>
              Certificate
            </Text>
            <Text style={{ fontFamily: normal, color: colors.grey, fontSize: f_xs }}>
              Make sure that every details of the document is clearly visible
            </Text>
            <View style={{ margin: 10 }} />
            <TouchableOpacity onPress={move_to_upload.bind(this, 'vehicle_certificate', vehicle_certificate.status, vehicle_certificate.path)} activeOpacity={1} style={{ borderWidth: 1, padding: 10, borderRadius: 5, borderStyle: 'dashed', flexDirection: 'row' }}>
              <View style={{ width: '70%' }}>
                <Text style={{ fontFamily: bold, color: vehicle_certificate.color, fontSize: f_s }}>{vehicle_certificate.status_name}</Text>
                <View style={{ margin: 5 }} />
                <Text style={{ fontFamily: normal, color: colors.grey, fontSize: f_xs }}>Upload your vehicle registration certificate</Text>
              </View>
              <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={vehicle_certificate.path} style={{ height: 75, width: 75 }} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ margin: 10 }} />
          <View>
            <Text style={{ fontFamily: bold, color: colors.theme_fg_two, fontSize: f_l }}>
              Vehicle Insurance
            </Text>
            <Text style={{ fontFamily: normal, color: colors.grey, fontSize: f_xs }}>
              Make sure that every details of the document is clearly visible
            </Text>
            <View style={{ margin: 10 }} />
            <TouchableOpacity onPress={move_to_upload.bind(this, 'vehicle_insurance', vehicle_insurance.status, vehicle_insurance.path)} activeOpacity={1} style={{ borderWidth: 1, padding: 10, borderRadius: 5, borderStyle: 'dashed', flexDirection: 'row' }}>
              <View style={{ width: '70%' }}>
                <Text style={{ fontFamily: bold, color: vehicle_insurance.color, fontSize: f_s }}>{vehicle_insurance.status_name}</Text>
                <View style={{ margin: 5 }} />
                <Text style={{ fontFamily: normal, color: colors.grey, fontSize: f_xs }}>Upload your vehicle insurance document</Text>
              </View>
              <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={vehicle_insurance.path} style={{ height: 75, width: 75 }} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ margin: 10 }} />
          <View>
            <Text style={{ fontFamily: bold, color: colors.theme_fg_two, fontSize: f_l }}>
              Vehicle Image
            </Text>
            <Text style={{ fontFamily: normal, color: colors.grey, fontSize: f_xs }}>
              Upload your vehicle image
            </Text>
            <View style={{ margin: 10 }} />
            <TouchableOpacity onPress={move_to_upload.bind(this, 'vehicle_image', vehicle_image.status, vehicle_image.path)} activeOpacity={1} style={{ borderWidth: 1, padding: 10, borderRadius: 5, borderStyle: 'dashed', flexDirection: 'row' }}>
              <View style={{ width: '70%' }}>
                <Text style={{ fontFamily: bold, color: vehicle_image.color, fontSize: f_s }}>{vehicle_image.status_name}</Text>
                <View style={{ margin: 5 }} />
                <Text style={{ fontFamily: normal, color: colors.grey, fontSize: f_xs }}>Upload your vehicle image with number board</Text>
              </View>
              <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={vehicle_image.path} style={{ height: 75, width: 75 }} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: bold, color: colors.theme_fg_two, fontSize: f_s }}>Your documents are uploaded.Please wait admin will verify your documents.</Text>
          <View style={{ margin: 20 }} />
          <TouchableOpacity onPress={go_back.bind(this)} activeOpacity={1} style={{ width: '100%', backgroundColor: colors.btn_color, borderRadius: 10, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: colors.theme_fg_two, fontSize: f_m, color: colors.theme_fg_three, fontFamily: bold }}>Go to home</Text>
          </TouchableOpacity>
        </View>
      }
       <DropdownAlert alert={func => (alt = func)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: colors.lite_bg,
    flexDirection: 'row',
    alignItems: 'center'
  },
  flex_1: {
    flex: 1
  },
  icon: {
    color: colors.theme_fg_three
  },
  header_body: {
    flex: 3,
    justifyContent: 'center'
  },
  upload_image: {
    width: 150,
    height: 150,
    borderColor: colors.theme_bg_three,
    borderWidth: 1
  },
  body_section: {
    width: '100%',
    backgroundColor: colors.theme_bg_three,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginBottom: 30,
    paddingBottom: 20
  },
  footer_section: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
  },
  name_title: {
    alignSelf: 'center',
    color: colors.theme_fg,
    alignSelf: 'center',
    fontSize: 20,
    letterSpacing: 0.5,
    fontFamily: bold
  },
  footer: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: colors.theme_bg
  },
  cnf_button_style: {
    backgroundColor: colors.theme_bg,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default connect(null, null)(VehicleDocument);