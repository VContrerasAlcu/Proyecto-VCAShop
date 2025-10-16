import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Componente Temporizador
 * Muestra una cuenta regresiva con formato visual y ejecuta una acción al finalizar.
 */
const Temporizador = ({
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  onComplete,
  mensaje
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days,
    hours,
    minutes,
    seconds,
  });

  useEffect(() => {
    const totalSeconds =
      days * 86400 + hours * 3600 + minutes * 60 + seconds;

    let countdown = totalSeconds;

    const timer = setInterval(() => {
      if (countdown > 0) {
        countdown--;

        setTimeLeft({
          days: Math.floor(countdown / 86400),
          hours: Math.floor((countdown % 86400) / 3600),
          minutes: Math.floor((countdown % 3600) / 60),
          seconds: countdown % 60,
        });
      } else {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [days, hours, minutes, seconds, onComplete]);

  /**
   * Renderiza el temporizador con estilo Bootstrap
   */
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card text-center" style={{ padding: "20px" }}>
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">{mensaje}</h6>
            </div>
            <div className="card-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {/* Días */}
                {timeLeft.days > 0 && (
                  <>
                    <h3 style={{ fontSize: "1.5rem", margin: "0" }}>
                      {timeLeft.days.toString().padStart(2, "0")}
                    </h3>
                    <h3 style={{ fontSize: "1.5rem", margin: "0" }}>:</h3>
                  </>
                )}

                {/* Horas */}
                {timeLeft.hours > 0 && (
                  <>
                    <h3 style={{ fontSize: "1.5rem", margin: "0" }}>
                      {timeLeft.hours.toString().padStart(2, "0")}
                    </h3>
                    <h3 style={{ fontSize: "1.5rem", margin: "0" }}>:</h3>
                  </>
                )}

                {/* Minutos y segundos */}
                <h3 style={{ fontSize: "1.5rem", margin: "0" }}>
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </h3>
                <h3 style={{ fontSize: "1.5rem", margin: "0" }}>:</h3>
                <h3 style={{ fontSize: "1.5rem", margin: "0" }}>
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temporizador;