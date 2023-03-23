import React from 'react'
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';

const IconList = (index: number, included?: boolean) => {
	const IconListArray = [
		() => <SmartDisplayOutlinedIcon color={included ? "primary" : "disabled"} />,
		() => <PhotoSizeSelectActualOutlinedIcon color={included ? "primary" : "disabled"} />,
		() => <VideocamOutlinedIcon color={included ? "primary" : "disabled"} />,
		() => <HeadsetMicOutlinedIcon color={included ? "primary" : "disabled"} />,
		() => <TextsmsOutlinedIcon color={included ? "primary" : "disabled"} />,
		() => <AllInclusiveOutlinedIcon color={included ? "primary" : "disabled"} />,
		() => <CloudDownloadOutlinedIcon color={included ? "primary" : "disabled"} />,
		() => <ConfirmationNumberOutlinedIcon color={included ? "primary" : "disabled"} />,
		() => <CardGiftcardOutlinedIcon color={included ? "primary" : "disabled"} />
	]

	return (IconListArray[index])
}

export default IconList