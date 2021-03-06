import React, { forwardRef, useRef, useState } from 'react';
import { IProfile } from '@services/user';
import {
  Container,
  Profile,
  Content,
  FullName,
  UserName,
  Follow,
  Dot,
  FollowButtons,
  Location,
  Bio,
  PhotoListTitle,
  StyledTitle,
  Photos,
  AnimatedAvatar,
  AnimatedBackground,
  Header,
  HeaderName,
  AnimatedSmallAvatar,
  IconsLeft,
  BoldText,
} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Animated,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import HoloAvatar, { AvatarSize } from '@components/holo-avatar';
import numeral from 'numeral';
import { IPhoto } from '@services/photo';
import CommonError from '@components/common/error';
import PhotoList from '@components/photos-flat-list';
import { useAppSelector } from '@store/store';
import { useNavigation } from '@react-navigation/native';
import FollowButton from '@components/follow-button';
import { HoloScreen } from '@constants';
import { ScreenName } from '@screens/follow';
import CommonEmpty from '@components/common/empty';
import theme from '@theme';

export const BACKGROUND_HEIGHT: number = AvatarSize.LARGE + 54;
const BACKGROUND_COLLAPSE_HEIGHT: number = 56;

interface Props extends Partial<IProfile> {
  avatarUrl?: string;
  following?: boolean | number;
  followers?: number;
  photos?: number;
  photoList: IPhoto[];
  loading: boolean;
  error?: boolean;
  reload: () => void;
  loadMore: () => void;
  uid?: string;
  follow?: boolean;
}

const CommonProfile = (
  {
    fullName,
    username,
    avatarUrl,
    bio,
    location,
    followers,
    following,
    photos,
    photoList,
    loading,
    error,
    reload,
    loadMore,
    follow,
    uid,
  }: Props,
  ref: React.Ref<FlatList<IPhoto>> | undefined,
) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { goBack, navigate } = useNavigation();
  const userName = useAppSelector(state => state.user.user?.profile.username);
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <Container>
      <AnimatedBackground
        source={{ uri: avatarUrl }}
        blurRadius={6}
        style={{
          height: scrollY.interpolate({
            inputRange: [0, BACKGROUND_HEIGHT - BACKGROUND_COLLAPSE_HEIGHT],
            outputRange: [BACKGROUND_HEIGHT, BACKGROUND_COLLAPSE_HEIGHT],
            extrapolate: 'clamp',
          }),
        }}
      >
        <Header>
          <IconsLeft>
            {username !== userName && (
              <TouchableWithoutFeedback
                onPress={() => {
                  goBack();
                }}
              >
                <Icon
                  name="left"
                  size={28}
                  color={theme.colors.white}
                  style={styles.back}
                />
              </TouchableWithoutFeedback>
            )}
            <AnimatedSmallAvatar
              style={{
                opacity: scrollY.interpolate({
                  inputRange: [
                    0,
                    BACKGROUND_HEIGHT - BACKGROUND_COLLAPSE_HEIGHT - 2,
                    BACKGROUND_HEIGHT - BACKGROUND_COLLAPSE_HEIGHT,
                  ],
                  outputRange: [0, 0, 1],
                  extrapolate: 'clamp',
                }),
              }}
            >
              <HoloAvatar
                size={AvatarSize.SMALL}
                url={avatarUrl}
                fullName={fullName}
              />
              <HeaderName>{fullName}</HeaderName>
            </AnimatedSmallAvatar>
          </IconsLeft>

          {username !== userName ? (
            <Icon
              name="ellipsis1"
              size={30}
              color={theme.colors.white}
              style={styles.iconHeader}
            />
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                navigate(HoloScreen.SETTINGS);
              }}
            >
              <Icon
                name="setting"
                size={28}
                color={theme.colors.white}
                style={styles.iconHeader}
              />
            </TouchableWithoutFeedback>
          )}
        </Header>

        <AnimatedAvatar
          style={{
            transform: [
              {
                scale: scrollY.interpolate({
                  inputRange: [
                    0,
                    BACKGROUND_HEIGHT - BACKGROUND_COLLAPSE_HEIGHT,
                  ],
                  outputRange: [1, 0.3],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateY: scrollY.interpolate({
                  inputRange: [
                    0,
                    BACKGROUND_HEIGHT - BACKGROUND_COLLAPSE_HEIGHT,
                  ],
                  outputRange: [60, -60],
                  extrapolate: 'clamp',
                }),
              },
            ],
            opacity: scrollY.interpolate({
              inputRange: [
                0,
                BACKGROUND_HEIGHT - BACKGROUND_COLLAPSE_HEIGHT - 40,
              ],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
          }}
        >
          <HoloAvatar
            size={AvatarSize.LARGE}
            url={avatarUrl}
            fullName={fullName}
          />
        </AnimatedAvatar>
      </AnimatedBackground>

      <PhotoList
        ref={ref}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              reload();
              setRefresh(false);
            }}
          />
        }
        photos={!error ? photoList : []}
        loading={loading}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!loading && photoList.length !== photos) {
            loadMore();
          }
        }}
        ListHeaderComponent={
          <>
            <Profile>
              <Content>
                {!!fullName && (
                  <FullName numberOfLines={1}>{fullName}</FullName>
                )}
                <UserName>@{username}</UserName>

                {!!location && (
                  <Location>
                    <Icon name="enviroment" size={14} />
                    {location}
                  </Location>
                )}
                {!!bio && <Bio ellipsizeMode="tail">{bio}</Bio>}
                <Follow>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (username !== userName) {
                        return;
                      }
                      navigate(HoloScreen.FOLLOW, {
                        screenName: ScreenName.FOLLOWERS,
                      });
                    }}
                  >
                    <FollowButtons>
                      <BoldText>{numeral(followers).format('0a')} </BoldText>
                      followers
                    </FollowButtons>
                  </TouchableWithoutFeedback>
                  <Dot />
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (username !== userName) {
                        return;
                      }
                      navigate(HoloScreen.FOLLOW, {
                        screenName: ScreenName.FOLLOWING,
                      });
                    }}
                  >
                    <FollowButtons>
                      <BoldText>{numeral(following).format('0a')} </BoldText>
                      following
                    </FollowButtons>
                  </TouchableWithoutFeedback>
                </Follow>

                {typeof follow === 'boolean' && (
                  <FollowButton following={follow} uid={uid} />
                )}
              </Content>
            </Profile>

            <PhotoListTitle>
              <StyledTitle>
                {username === userName ? 'My photos' : 'Photos'}
              </StyledTitle>
              <Photos>{numeral(photos).format('0a')}</Photos>
            </PhotoListTitle>

            {error && <CommonError />}

            {photoList.length === 0 && !loading && !error && (
              <CommonEmpty
                description={
                  username === userName
                    ? 'You have not uploaded any photos yet.'
                    : 'Nothing here.'
                }
              />
            )}
          </>
        }
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  back: {
    paddingLeft: 12,
    textShadowOffset: { width: 0, height: 0 },
    textShadowColor: theme.colors.darkGray,
    textShadowRadius: 2,
  },
  iconHeader: {
    alignSelf: 'flex-end',
    padding: 12,
    textShadowOffset: { width: 0, height: 0 },
    textShadowColor: theme.colors.black,
    textShadowRadius: 2,
  },
  loading: {
    width: 70,
    height: 70,
  },
});

export default forwardRef(CommonProfile);
