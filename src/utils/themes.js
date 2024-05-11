import { createTheme } from "@mui/material/styles"


export const customTheme = createTheme({
  components: {
   
  },
})

export const customStyles = {
  headCells: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      backgroundColor: "#ffc620",
      color: "black", 
      fontSize: "1em"

    },
  },
  cells: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "1em",
      textAlign: "center",
      fontSize: "0.8em"
    },
  },
}