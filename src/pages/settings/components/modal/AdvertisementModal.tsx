// ** React Imports
import React from 'react'

import Image from 'next/image'

// ** MUI Imports
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    TextField,
    Typography
} from '@mui/material'

// ** Custom Imports
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import { DateType } from '@/types/forms/reactDatepickerTypes'
import CustomInput from '@/layouts/components/shared-components/Picker/CustomPickerInput'

// ** Style Imports
import { styles } from '../../styles/adsModalStyles'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    adTitle: string
}

const AdvertisementModal: React.FC<ModalProps> = ({ isOpen, onClose, adTitle }) => {
    const [date, setDate] = React.useState<DateType>(new Date())

    return (
        <DatePickerWrapper>
            <Dialog open={isOpen} onClose={onClose}>
                <DialogContent sx={styles.dialogContent}>
                    <DialogTitle sx={styles.title}>
                        Advertisements
                    </DialogTitle>

                    <Box sx={styles.container}>
                        <Box
                            sx={styles.left}
                        >
                            <Box
                                sx={styles.adsTitle}
                            >
                                <Typography sx={styles.adsText}>{adTitle}</Typography>
                            </Box>

                            <Box sx={styles.uploadContainer}>
                                <Box
                                    sx={styles.imgWrapper}
                                >
                                    <Image src='/images/icons/butterfly-template-icon.png' width={50} height={50} alt='template icon' />

                                    <Button
                                        sx={styles.uploadBtn}>
                                        Upload
                                    </Button>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            sx={styles.right}
                        >
                            <Box>
                                <Typography>Duration: Start Date</Typography>
                                <DatePicker
                                    selected={date}
                                    id='basic-input'
                                    onChange={(date: Date) => setDate(date)}
                                    placeholderText='Click to select a date'
                                    customInput={<CustomInput customWidth='100%' />}
                                />
                            </Box>

                            <Box>
                                <Typography>Duration: End Date</Typography>
                                <DatePicker
                                    selected={date}
                                    id='basic-input'
                                    onChange={(date: Date) => setDate(date)}
                                    placeholderText='Click to select a date'
                                    customInput={<CustomInput customWidth='100%' />}
                                />
                            </Box>

                            <Box>
                                <Typography>URL Link:</Typography>
                                <TextField sx={styles.fullWidth} />
                            </Box>

                            <Box sx={styles.bottomBtnWrapper}>
                                <Button
                                    sx={styles.bottomBtns}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    sx={styles.bottomBtns}
                                >
                                    Publish
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </DatePickerWrapper>
    )
}

export default AdvertisementModal
