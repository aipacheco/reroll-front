import { createTheme } from "@mui/material/styles"
import "../components/FabIcon/FabIcon.css"

export const FabTheme = createTheme({
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f8ff",

          color: "#2e2e2e",
          "&:hover": {
            backgroundColor: "#c8ffff",
            boxShadow:
              "2px -2px 1px rgba(255, 0, 255, 1), -2px 2px 1px rgba(0, 255, 255, 1)",
            animation: "rotate-center 0.6s ease-in-out both",
          },
        },
      },
    },
  },
})

export const PinkTheme = createTheme({
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: "#ff00ff ",

          color: "#2e2e2e",
          "&:hover": {
            backgroundColor: "#c8ffff",
            boxShadow:
              "2px -2px 1px rgba(255, 0, 255, 1), -2px 2px 1px rgba(0, 255, 255, 1)",
            animation: "rotate-center 0.6s ease-in-out both",
          },
        },
      },
    },
  },
})
export const JelloTheme = createTheme({
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f8ff",

          color: "#2e2e2e",
          "&:hover": {
            backgroundColor: "#c8ffff",
            boxShadow:
              "2px -2px 1px rgba(255, 0, 255, 1), -2px 2px 1px rgba(0, 255, 255, 1)",
            animation: "jello-diagonal-1 0.8s",
          },
        },
      },
    },
  },
})

export const OutTheme = createTheme({
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f8ff",

          color: "#2e2e2e",
          "&:hover": {
            backgroundColor: "#c8ffff",
            boxShadow:
              "2px -2px 1px rgba(255, 0, 255, 1), -2px 2px 1px rgba(0, 255, 255, 1)",
            animation: "jello-horizontal 1s ",
          },
        },
      },
    },
  },
})

export const EditTheme = createTheme({
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f8ff",

          color: "#2e2e2e",
          "&:hover": {
            backgroundColor: "#c8ffff",
            boxShadow:
              "2px -2px 1px rgba(255, 0, 255, 1), -2px 2px 1px rgba(0, 255, 255, 1)",
            animation: "rotate-scale-up 0.65s ",
          },
        },
      },
    },
  },
})

export const customStyles = {
  headCells: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      backgroundColor: "rgba(255,0,255,1)",
      color: "white", 
      fontSize: "1.3em"

    },
  },
  cells: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      fontSize: "1em"
    },
  },
}