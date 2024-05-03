/* eslint-disable react/prop-types */
import React from "react"
import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"
import SwipeableViews from "react-swipeable-views"
import { autoPlay } from "react-swipeable-views-utils"
import { MobileStepper } from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom"
import { useNavigate } from "react-router-dom"

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const SingleGame = ({
  images,
  name,
  description,
  playersMin,
  playersMax,
  price,
  author
}) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = images.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === maxSteps - 1 ? 0 : prevActiveStep + 1
    )
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step) => {
    setActiveStep(step)
  }
  const handleAuthor = () => {
    navigate(`/${author}`)
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ maxWidth: 650, flexGrow: 1 }}>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 650,
                    display: "block",
                    maxWidth: 650,
                    overflow: "hidden",
                    width: "100%",
                    padding: 2,
                    objectFit: "cover",
                    border: "1px solid orange",
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          sx={{
            border: "1px solid orange",
            '& .MuiMobileStepper-dot': {
                backgroundColor: 'beige', 
              },
              '& .MuiMobileStepper-dotActive': {
                backgroundColor: 'orange',
          }}}
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              sx={{ color: 'orange' }}
            >
              Siguiente
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{ color: 'orange' }}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Anterior
            </Button>
          }
        />
        <CardContent
          sx={{
            border: "1px solid orange",
          }}
        >
          <Typography color="text.secondary" onClick={handleAuthor} className="clickable">{author}</Typography>
          <Typography color="text.dark" variant="h6">{name}</Typography>
          <Typography color="text.secondary">{description}</Typography>
          <Typography color="text.secondary">
            {playersMin} - {playersMax} jugadores
          </Typography>
          <Typography color="text">{price} €</Typography>
          <ButtonCustom text={"comprar"} isFormComplete={true} />
        </CardContent>
      </Card>
    </Box>
  )
}

export default SingleGame
