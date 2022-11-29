import React, { useEffect, useState, useContext} from 'react'
import {CircularProgress} from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors';
import RestaurantCard from '../../components/RestaurantCard';
import {getRankingRestaurants, getRankingWinner} from '../../services/Restaurant'
import { LoginContext } from '../../contexts/LoginContext'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976D2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {

  const [loading, setLoading] = useState(true)
  const [rankings, setRankings] = useState([])
  const {verifyTime} = useContext(LoginContext)
  const [time, setTime] = useState()
  const [winner, setWinner] = useState()


  useEffect(() => {
    loadRankings()
    if(verifyTime()) return
    loadWinner()
  }, [])

  const loadRankings = async () => {
    const getRankings = await getRankingRestaurants()
    setRankings(getRankings)
    setTime(verifyTime())
    setLoading(false)
    console.log(rankings)
  }

  const loadWinner = async () => {
    const { restaurant } = await getRankingWinner()
    setWinner(restaurant)
  }
  return (
    <Box 
        sx={{marginTop: 10}}
        display="flex"
        justifyContent="space-around"
        alignItems="center" 
    >
      {loading ? 
              <Box 
                display="flex"
                justifyContent="center"
                alignItems="center" 
                minHeight="90vh"
              >
                  <CircularProgress color="primary" />
              </Box>
              :
        <TableContainer component={Paper} sx={{width:400}}>
            <Table sx={{ minWidth: 200 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Restaurante</StyledTableCell>
                    <StyledTableCell align="right">Votos</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {rankings.map((r,i) => (
                        <StyledTableRow key={i}>
                            <StyledTableCell component="th" scope="row" sx={{justifyContent:'center'}}>
                                {i === 0 && (
                                    !time && (
                                      <StarIcon sx={{ color: yellow[900], marginRight: 1, verticalAlign: 'sub'}}/>
                                    )
                                )}
                                {r.restaurant.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{r.votos}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>}
        {
          winner && (
            <RestaurantCard restaurant={winner} isShown={false}/> 
          )
        }

        

    </Box>
  );
}