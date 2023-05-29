import React, { useEffect } from "react";
import config from '@/utils/scannerConfig.json'
import Quagga from "quagga";
import styles from '@/styles/Scanner.module.css'
import { Button, VStack, Box, Text, Center } from '@chakra-ui/react'

const Scanner = props => {
  const { onDetected, onClose } = props;

  useEffect(() => {
    Quagga.init(config, err => {
      if (err) {
        console.log(err, "error msg");
      }
      Quagga.start();
      return () => {
        Quagga.stop()
      }
    });

    //detecting boxes on stream
    Quagga.onProcessed(result => {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            Number(drawingCanvas.getAttribute("width")),
            Number(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function (box) {
              return box !== result.box;
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });

    Quagga.onDetected(detected);
  }, []);

  const detected = result => {
    onDetected(result.codeResult.code);
  };

  return (
    <div className={styles.wrapper}>
      <VStack>
        <Text as='h2' fontSize='30px'>Zeskanuj produkt</Text>
        <div id="interactive" className="viewport" />
        <Box w='100%'>
          <Center h='100px'>
            <Button colorScheme='red' onClick={onClose}>Zakmnij</Button>
          </Center>
        </Box>
      </VStack>
    </div>
  );
};

export default Scanner;
