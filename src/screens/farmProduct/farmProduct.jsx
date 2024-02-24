import React, { useEffect, useState } from "react";
import "./farmProduct.css";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Paper from "@mui/material/Paper";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Farmproduct = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  return (
    <div className="farmproduct">
      <div className="farmproduct1">
        <div className="farmproduct2">
          <div className="farmproduct2_sub1">
            {searchVisible && (
              <div className="farmproduct2_sub2">
                <TextField name="minStock" label="Search" size="small" />
              </div>
            )}
            {!searchVisible && (
              <div className="farmproduct2_sub3">
                <div onClick={() => setSearchVisible(!searchVisible)}>
                  <SearchIcon />
                </div>
                <Button variant="contained">Add Item</Button>
              </div>
            )}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Item</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ " td, th": { border: 0 } }} size="small">
                    <TableCell align="left">Orange</TableCell>
                    <TableCell align="right" style={{ color: "red" }}>
                      10
                    </TableCell>
                    <TableCell align="right">
                      <MoreVertIcon />
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">Apple</TableCell>
                    <TableCell align="right" style={{ color: "red" }}>
                      10
                    </TableCell>
                    <TableCell align="right">
                      <MoreVertIcon />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="farmproduct3">
          <div className="farmproduct4">
            <div className="farmproduct4-sub1">
              <div className="farmproduct4-sub2">
                <div className="farmproduct4-sub3">
                  <h4>Orange</h4>
                </div>
                <div className="farmproduct4-sub3">
                  <Button variant="contained">Adjust</Button>
                </div>
              </div>
              <div className="farmproduct4-sub2">
                <div className="farmproduct4-sub3">
                  <p>
                    Sale Price: <span>£ 150.00</span>
                  </p>
                </div>
                <div className="farmproduct4-sub3">
                  <p>
                    Stock Quantity : <span>10</span>
                  </p>
                </div>
              </div>
              <div className="farmproduct4-sub2">
                <div className="farmproduct4-sub3">
                  <p>
                    Purchase Price: <span>£ 120.00</span>
                  </p>
                </div>
                <div className="farmproduct4-sub3">
                  <p>
                    Stock Quantity : <span>£ 1200</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="farmproduct5">
            <div className="farmproduct5-sub1">
              <h4>Transaction</h4>
              <TextField label="Search" size="small" />
            </div>
            <div className="farmprduct5-sub2">
              <TableContainer component={Paper}>
                <Table
                  style={{width:"100%"}}
                  size="small"
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell> </TableCell>
                      <TableCell>TYPE</TableCell>
                      <TableCell>NAME</TableCell>
                      <TableCell>DATE </TableCell>
                      <TableCell>QUANTITY</TableCell>
                      <TableCell>PRICE/UNIT</TableCell>
                      <TableCell>STATUS</TableCell>
                      <TableCell> </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell><FiberManualRecordIcon style={{color:"blue"}}/></TableCell>
                      <TableCell>Purchase</TableCell>
                      <TableCell>Orange</TableCell>
                      <TableCell>24/02/2024</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>120</TableCell>
                      <TableCell>paid</TableCell>
                      <TableCell>
                        <MoreVertIcon />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farmproduct;
