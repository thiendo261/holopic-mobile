import styled from 'styled-components/native';
import HoloButton from '@components/holo-button';

export const Container = styled.View`
  flex: 1;
  align-items: flex-start;
  padding: 0px 0px 300px;
  background-color: ${({ theme }) => theme.colors.background};
`;
// justify-content: space-between;
export const BackButton = styled.View`
  padding: 10px 8px;
  border-radius: 99px;
`;

export const ContentContainer = styled.View`
  padding-horizontal: 20px;
  margin-bottom: 40px;
`;

export const Title = styled.Text`
  font-family: 'Quicksand-Medium';
  font-size: 18px;
  color: ${({ theme }) => theme.colors.darkGray};
  margin: 10px 0px;
`;

export const Heading = styled.Text`
  font-family: 'Quicksand-Bold';
  font-size: 30px;
`;

export const ResendOTPCode = styled(HoloButton)`
  width: 70%;
  align-self: center;
  margin-bottom: 20px;
`;

export const SubmitOTPCode = styled(HoloButton)`
  width: 70%;
  align-self: center;
`;
