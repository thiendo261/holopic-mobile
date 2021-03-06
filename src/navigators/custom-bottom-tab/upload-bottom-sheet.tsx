import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import {
  BottomSheetContainer,
  BottomSheetTitle,
  BottomSheetListItem,
  BottomSheetItem,
  BottomSheetItemTitle,
} from './styles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { HoloScreen } from '@constants';
import { useAppDispatch } from '@store/store';
import { photoActions } from '@store/slices/photo';

const BottomSheet = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();

  const _onOpenGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      },
      response => {
        if (response.uri) {
          dispatch(photoActions.showUploadBottomSheet(false));
          navigate(HoloScreen.UPLOAD_PHOTO, {
            fileName: response.fileName,
            type: response.type,
            uri: response.uri,
          });
        }
      },
    );
  };

  const _onOpenCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      },
      response => {
        if (response.uri) {
          dispatch(photoActions.showUploadBottomSheet(false));
          navigate(HoloScreen.UPLOAD_PHOTO, {
            fileName: response.fileName,
            type: response.type,
            uri: response.uri,
          });
        }
      },
    );
  };

  return (
    <BottomSheetContainer>
      <BottomSheetTitle>{t('uploadAPhoto')}</BottomSheetTitle>

      <BottomSheetListItem>
        <TouchableWithoutFeedback onPress={_onOpenGallery}>
          <BottomSheetItem>
            <Icon name="picture" size={34} color="#51bd63" />
            <BottomSheetItemTitle>{t('openGallery')}</BottomSheetItemTitle>
          </BottomSheetItem>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={_onOpenCamera}>
          <BottomSheetItem>
            <Icon name="camerao" size={34} color="#2979e7" />
            <BottomSheetItemTitle>{t('openCamera')}</BottomSheetItemTitle>
          </BottomSheetItem>
        </TouchableWithoutFeedback>
      </BottomSheetListItem>
    </BottomSheetContainer>
  );
};

export default BottomSheet;
