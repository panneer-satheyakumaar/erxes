import styled from 'styled-components';
import colors from './colors';
import { rgba } from '../styles/color';
import { fadeIn, slideDown } from 'modules/common/utils/animations';

const AttachmentWrapper = styled.div`
  border-radius: 4px;
  transition: all 0.3s ease;
  display: flex;
  color: ${colors.textPrimary};
  position: relative;
  width: 550px
  img {
    max-width: 100%;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  padding: 10px 15px;
  word-wrap: break-word;
  h5 {
    margin: 0 0 5px;
    font-weight: bold;
  }
  video {
    width: 100%;
  }
`;

const Download = styled.a`
  color: ${colors.colorCoreGray};
  margin-left: 10px;
  &:hover {
    color: ${colors.colorCoreBlack};
  }
`;

const PreviewWrapper = styled.div`
  height: 80px;
  width: 110px;
  background: ${rgba(colors.colorCoreDarkBlue, 0.08)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  align-self: center;
  i {
    font-size: 36px;
    color: ${colors.colorSecondary};
  }
`;

const Meta = styled.div`
  position: relative;
  font-weight: 500;
  color: ${colors.colorCoreGray};
  > * + * {
    margin-left: 10px;
  }
`;

const AttachmentName = styled.span`
  word-wrap: break-word;
  word-break: break-word;
  line-height: 20px;
`;

const List = styled.div`
  margin: 10px 0;
`;

const Item = styled.div`
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  &:hover {
    background: ${rgba(colors.colorCoreDarkBlue, 0.08)};
  }
`;

const Delete = styled.span`
  margin-right: 15px;
  text-decoration: underline;
  transition: all 0.3s ease;
  color: ${colors.colorCoreGray};
  align-self: center;
  font-size: 20px;
  &:hover {
    color: ${colors.colorCoreBlack};
    cursor: pointer;
  }
`;

const ToggleButton = styled.div`
  padding: 7px 15px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${rgba(colors.colorCoreDarkBlue, 0.07)};
  }
`;

const LoadingContainer = styled(List)`
  background: ${colors.bgActive};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    height: 80px;
    margin-right: 7px;
  }
`;

const UploadBtn = styled.div`
  position: relative;
  margin-top: 10px;
  label {
    padding: 7px 15px;
    background: ${rgba(colors.colorCoreDarkBlue, 0.05)};
    border-radius: 4px;
    font-weight: 500;
    transition: background 0.3s ease;
    display: inline-block;
    &:hover {
      background: ${rgba(colors.colorCoreDarkBlue, 0.1)};
      cursor: pointer;
    }
  }
  input[type='file'] {
    display: none;
  }
`;

const BiggerPreviewWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(48, 67, 92, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  z-index: 50000;
  animation-name: ${fadeIn};
  animation-duration: 0.3s;
  animation-timing-function: ease;

  img {
    width: auto;
    max-width: 80%;
    max-height: 80%;
    max-height: 80vh;
    box-shadow: 0 2px 10px -3px rgba(0, 0, 0, 0.5);
    transition: max-width 0.1s ease, max-height 0.1s ease;
    animation-name: ${slideDown};
    animation-duration: 0.3s;
    animation-timing-function: ease;
  }
`;

const Image = styled.img`
  transition: all 0.3s;
  border-radius: 4px;

  &:hover {
    opacity: 0.8;
  }
`;

const Next = styled.div`
  right:0
  border-radius: 45px
  position: absolute
  color: black;
  display: inline-block
  
  .icon-arrow-right{
    font-size: 50px
  }
`;

const Previous = styled.div`
  left:0
  border-radius: 45px
  position: absolute
  color: black;
  display: inline-block
  
  .icon-arrow-left{
    font-size: 50px
  }
`

const Close = styled.div`
  right: 0
  top:0
  color: black
  display: inline-block
  position: absolute
  margin: 10px 20px
  
  .icon-cancel{
    font-size: 25px
  }
`

export {
  AttachmentWrapper,
  ItemInfo,
  UploadBtn,
  LoadingContainer,
  PreviewWrapper,
  Download,
  ToggleButton,
  Delete,
  Item,
  List,
  AttachmentName,
  Meta,
  BiggerPreviewWrapper,
  Image,
    Next,
    Previous,
    Close
};
