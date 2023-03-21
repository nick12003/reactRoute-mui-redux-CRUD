import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Chip,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import ConfirmModal from "./ConfirmModal";

import { listAction } from "../redux/list";
const { deleteOne, fetchList, resetList } = listAction;

const ListPage = () => {
  // const loaderData = useLoaderData();
  const [modalOption, setModalOption] = useState({
    isOpen: false,
    targetId: "",
    targetTitle: "",
  });

  const { list } = useSelector((state) => state.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetList());
    dispatch(fetchList());
  }, []);

  const handleOnConfirm = () => {
    dispatch(deleteOne({ id: modalOption.targetId }));
    handleCloseModal();
  };

  const handleOpenModal = (id, title) => {
    setModalOption({
      isOpen: true,
      targetId: id,
      targetTitle: title,
    });
  };

  const handleCloseModal = () => {
    setModalOption({
      isOpen: false,
      targetId: "",
      targetTitle: "",
    });
  };

  return (
    <Container style={{ padding: "2rem" }}>
      <ConfirmModal
        isOpen={modalOption.isOpen}
        title={modalOption.targetTitle}
        onClose={handleCloseModal}
        onConfirm={handleOnConfirm}
      />
      <Box display='flex' justifyContent='center'>
        <Typography variant='h2'>task list</Typography>
      </Box>
      <Box display='flex' justifyContent='end'>
        <Link to='/new'>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Link>
      </Box>
      <Box display='flex' justifyContent='center'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>title</TableCell>
                <TableCell align='right'>completed</TableCell>
                <TableCell align='right'>action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TableRow
                  key={row._uuid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.title}
                  </TableCell>
                  <TableCell align='right'>
                    {row.completed ? (
                      <Chip label='completed' color='success' />
                    ) : (
                      <Chip label='not completed' />
                    )}
                  </TableCell>
                  <TableCell align='right'>
                    <Link to={`/edit/${row._uuid}`}>
                      <Tooltip title='Edit'>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    <Tooltip title='Delete'>
                      <IconButton
                        onClick={() => {
                          handleOpenModal(row._uuid, row.title);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ListPage;
