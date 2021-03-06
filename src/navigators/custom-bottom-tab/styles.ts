import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { Animated } from 'react-native';
import { BOTTOM_TAB_HEIGHT } from '@constants';

export const Container = styled.View`
  flex-direction: row;
  height: ${BOTTOM_TAB_HEIGHT}px;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: space-around;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  elevation: 8;
`;

export const Tab = styled.View`
  height: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
`;

const UploadImageButton = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const AnimatedUploadImageButton = Animated.createAnimatedComponent(
  UploadImageButton,
);

export const StyledLinearGradient = styled(LinearGradient)`
  height: 100%;
  width: 100%;
  border-radius: 999px;
  justify-content: center;
  align-items: center;
`;

const BottomSheetHeader = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  height: 4px;
  width: 32px;
  align-self: center;
  margin-bottom: 6px;
  border-radius: 999px;
`;

export const AnimatedBottomSheetHeader = Animated.createAnimatedComponent(
  BottomSheetHeader,
);

export const BottomSheetContainer = styled.View`
  flex: 1;
  padding: 0px 16px;
  background-color: ${({ theme }) => theme.colors.white};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const BottomSheetTitle = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 18px;
  text-align: center;
  padding: 8px 0px;
`;

export const BottomSheetListItem = styled.View`
  flex: 1;
`;

export const BottomSheetItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 0px;
  margin: 8px 0px;
`;

export const BottomSheetItemTitle = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 18px;
  margin-left: 8px;
`;
