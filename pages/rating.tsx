import {
  Paper,
  Typography,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { FollowButton } from "../components/FollowButton";
import { MainLayout } from "../layouts/MainLayout";
import { Api } from "../utils/api";
import { UserResponse } from "../utils/api/types";

interface RatingPageProps {
  users: UserResponse[];
}

const RatingPage: NextPage<RatingPageProps> = ({ users }) => {
  return (
    <MainLayout>
      <Paper className="pl-20 pt-20 pr-20 mb-20" elevation={0}>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", fontSize: 30, marginBottom: 6 }}
        >
          Рейтинг сообществ и блогов
        </Typography>
        <Typography style={{ fontSize: 15 }}>
          Десять лучших авторов и комментаторов, а также администраторы первых
          десяти сообществ из рейтинга по итогам месяца бесплатно получают
          Plus-аккаунт на месяц.
        </Typography>
        <Tabs
          className="mt-10"
          value={0}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Август" />
          <Tab label="За 3 месяца" />
          <Tab label="За всё время" />
        </Tabs>
      </Paper>

      <Paper elevation={0}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Имя пользователя</TableCell>
              <TableCell align="center">Рейтинг</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  <span className="mr-15">{index + 1}</span>
                  {user.fullName}
                </TableCell>
                <TableCell align="center">{user.rating}</TableCell>
                <TableCell align="right">
                  <FollowButton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const users = await Api().user.getAll();

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.warn("Fetch users error", error);

    return {
      props: {
        users: null,
      },
    };
  }
};

export default RatingPage;
