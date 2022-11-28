import { Typography, Grid } from "@material-ui/core";
const ManualPage = ({ contentPage }) => {
  return (
    <Grid container>
      {contentPage.map((content, index) => (
        <Grid
          item
          xs={12}
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid item xs={12} style={{ marginTop: "40px" }}>
            <Typography
              variant="h4"
              style={{
                textAlign: "center",
                whiteSpace: "pre-wrap",
              }}
            >
              {content.title}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={content.img}
              alt=""
              style={{
                marginTop: "20px",
                width: "800px",
                margin: "auto",
              }}
            ></img>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              whiteSpace: "pre-wrap",
              display: "flex",
              justifyContent: "flex-start",
              marginLeft: "70px",
              marginTop: "20px",
            }}
          >
            {content.body}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
export default ManualPage;
