import { useState, useEffect } from "react";
import { Box, Button, Heading, Text, useToast } from "@chakra-ui/react";
import { useLoggedIn } from "../Context/useLoggedIn";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const { isLoggedIn } = useLoggedIn();
  const navigate = useNavigate();

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);
  const toast = useToast();

  useEffect(() => {
    let timer: any;
    if (gameStarted && !gameOver) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setGameOver(true);
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [gameStarted, gameOver, timeLeft]);

  const handleStartGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(40);
    startColorChange();
  };

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  const startColorChange = () => {
    const randomDelay = Math.floor(Math.random() * 1000) + 1000;
    setTimeout(() => {
      if (!gameOver) {
        const isGreen = Math.random() < 0.5;
        if (isGreen) {
          setScore((prevScore) => prevScore + 1);
        } else {
          setGameOver(true);
        }
        startColorChange();
      }
    }, randomDelay);
  };

  const handleGameOver = () => {
    setGameStarted(false);
    toast({
      title: "Game Over",
      description: "You lost the game.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleWin = () => {
    setGameStarted(false);
    toast({
      title: "You Win!",
      description: "Congratulations, you won the game!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Heading size="lg" mb={4}>
        Green Light, Red Light Game
      </Heading>
      {!gameStarted && (
        <Button colorScheme="green" size="lg" onClick={handleStartGame}>
          Start Game
        </Button>
      )}
      {gameStarted && (
        <>
          <Text fontSize="xl" mt={4}>
            Time Left: {timeLeft} seconds
          </Text>
          <Text fontSize="xl" mt={2}>
            Score: {score}
          </Text>
          <Box
            width="100px"
            height="100px"
            borderRadius="50%"
            bg={gameOver ? "red" : "green"}
            mt={4}
          ></Box>
          {gameOver && (
            <Button colorScheme="red" size="lg" onClick={handleGameOver}>
              Game Over
            </Button>
          )}
          {score >= 10 && (
            <Button colorScheme="green" size="lg" onClick={handleWin}>
              You Win!
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export default Game;
