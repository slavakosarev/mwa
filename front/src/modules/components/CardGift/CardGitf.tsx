import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectListGift,
  selectUser,
  useAppDispatch,
  useCustomeNavigate,
} from "../..";
import { useRole } from "../../requireAuth";
import { getGifts } from "../../store/ThunkCreator";
import { useEffect } from "react";
import { ListGift } from "../../../interfaces";
import { CreateGift } from "../CreateGift";

export function CardGift() {
  const [navigateMain] = useCustomeNavigate("/", true);
  const { value: user } = useSelector(selectUser);
  const { value: gift } = useSelector(selectListGift);
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const role = useRole(user.userId, 2);
  useEffect(() => {
    dispatch(getGifts("запрос"));
  }, []);
  return (
    <>
      <CreateGift eventId={slug || ""} />
      {gift
        .filter((el) => el.eventId === slug)
        .map((el: ListGift) => {
          return (
            <Card sx={{ width: 270, ml: "auto", mr: "auto", mb: "1em" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={el.link}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {el.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  sx={{
                    textTransform: "unset",
                    color: "#333",
                    paddingLeft: "10px",
                  }}
                  size="small"
                  color="primary"
                  {...navigateMain}
                >
                  Узнать больше ›
                </Button>
              </CardActions>
            </Card>
          );
        })}
    </>
  );
}
