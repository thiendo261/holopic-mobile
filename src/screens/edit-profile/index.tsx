import HoloAvatar, { AvatarSize } from '@components/holo-avatar';
import { useAppDispatch, useAppSelector } from '@store/store';
import React, { useState } from 'react';
import {
  Container,
  AvatarWrapper,
  EditIcon,
  StyledHoloButton,
  EditProfileForm,
  StyledTextInput,
  Label,
} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import theme from '@theme';
import { Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native';
import HoloHeader from '@components/holo-header';
import { gradientPreset, SizeButton } from '@components/holo-button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { launchImageLibrary } from 'react-native-image-picker';
import { IUploadPhotoParams } from '@navigators/app-stack';
import { userActions } from '@store/slices/user';
import RNPickerSelect from 'react-native-picker-select';
import { Gender } from '@services/user';

const EditProfileScreen = () => {
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();
  const [newAvatar, setNewAvatar] = useState<IUploadPhotoParams>();

  const genderList = [
    { label: Gender.NA, value: Gender.NA, key: Gender.NA },
    { label: 'Male', value: Gender.MALE, key: Gender.MALE },
    { label: 'Female', value: Gender.FEMALE, key: Gender.FEMALE },
  ];

  const editProfileSchema = yup.object().shape({
    fullName: yup.string().min(1).trim().required(),
    username: yup.string().min(4).trim().matches(/^\S+$/gi).required(),
    bio: yup.string().trim().optional(),
    location: yup.string().trim().optional(),
  });

  const formik = useFormik({
    initialValues: {
      fullName: user?.profile.fullName as string,
      username: user?.profile.username as string,
      gender: user?.profile.gender as Gender,
      bio: user?.profile.bio as string,
      location: user?.profile.location as string,
    },
    validationSchema: editProfileSchema,
    onSubmit: values => {
      Keyboard.dismiss();
      dispatch(
        userActions.editProfileRequest({
          values,
          publicId: user?.profile.avatar.publicId,
          newAvatar,
        }),
      );
    },
  });

  const _onChangeAvatar = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      },
      response => {
        if (response.uri && response.fileName && response.type) {
          setNewAvatar({
            fileName: response.fileName,
            type: response.type,
            uri: response.uri,
          });
        }
      },
    );
  };

  return (
    <Container>
      <HoloHeader
        headerTitle="Edit Profile"
        headerRight={
          <StyledHoloButton
            size={SizeButton.SMALL}
            title="  Done  "
            gradient={gradientPreset}
            titleBold
            titleColor={theme.colors.white}
            titleSize={15}
            onPress={formik.handleSubmit}
            disabled={Object.keys(formik.errors).length !== 0}
          />
        }
      />
      <ScrollView keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={_onChangeAvatar}>
          <AvatarWrapper>
            <HoloAvatar
              size={AvatarSize.LARGE}
              url={newAvatar?.uri || user?.profile.avatar.url}
              fullName={user?.profile.fullName}
              hideDefaultAvatar={!!newAvatar?.uri}
            />
            <EditIcon>
              <Icon name="edit" size={16} color={theme.colors.black} />
            </EditIcon>
          </AvatarWrapper>
        </TouchableWithoutFeedback>

        <EditProfileForm>
          <Label>Full Name</Label>
          <StyledTextInput
            error={formik.errors.fullName}
            placeholder="Add..."
            maxLength={64}
            selectionColor={theme.colors.primary}
            value={formik.values.fullName}
            onChangeText={formik.handleChange('fullName')}
          />

          <Label>Username</Label>
          <StyledTextInput
            error={formik.errors.username}
            placeholder="Add..."
            maxLength={32}
            selectionColor={theme.colors.primary}
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            autoCapitalize="none"
          />

          <Label>Gender</Label>
          <RNPickerSelect
            value={formik.values.gender}
            onValueChange={formik.handleChange('gender')}
            placeholder={{}}
            items={genderList}
            useNativeAndroidPickerStyle={false}
            style={{
              inputAndroid: {
                borderRadius: 16,
                fontSize: 15,
                padding: 12,
                marginTop: 8,
                marginBottom: 20,
                backgroundColor: theme.colors.lightGray,
                color: theme.colors.black,
                fontFamily: 'Quicksand-Medium',
              },
            }}
          />

          <Label>Bio</Label>
          <StyledTextInput
            error={formik.errors.bio}
            placeholder="Add..."
            maxLength={255}
            selectionColor={theme.colors.primary}
            value={formik.values.bio}
            multiline
            onChangeText={formik.handleChange('bio')}
          />

          <Label>Location</Label>
          <StyledTextInput
            error={formik.errors.location}
            placeholder="Add..."
            maxLength={64}
            selectionColor={theme.colors.primary}
            value={formik.values.location}
            onChangeText={formik.handleChange('location')}
          />
        </EditProfileForm>
      </ScrollView>
    </Container>
  );
};

export default EditProfileScreen;
