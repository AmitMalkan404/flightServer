

export const calculatePositionForAllFlights = (flightsDataArray) => {
flightsDataArray.forEach(flightData => {
  const returnData = getCurrentAndPreviousSegmentsWithDateTime(flightData);
  if (!returnData.includes(undefined)&&!returnData.includes(null)){
    console.log(calculateCurrentPosition(returnData[0], returnData[1], returnData[2]))
  }
});
}

const getCurrentAndPreviousSegmentsWithDateTime = (flightData) => {
  const currentTime = new Date().getTime();
  let currentSegment = null;
  let previousSegment = null;
  let currentSegmentStartTime = null;

  for (const segment of flightData.segments) {
    const segmentStartTime = currentSegmentStartTime
      ? currentSegmentStartTime
      : new Date(flightData.initial_location.date_time).getTime();

    const segmentEndTime = segmentStartTime + segment.timespan_seconds * 1000;

    if (currentTime >= segmentStartTime && currentTime <= segmentEndTime) {
      currentSegment = segment;
      currentSegmentStartTime = segmentStartTime;
      break;
    }

    previousSegment = segment;
    currentSegmentStartTime = segmentEndTime;
  }

  return [currentSegment, previousSegment, currentSegmentStartTime];
}

const calculateCurrentPosition = (currentSegment, previousSegment, currentSegmentStartTime) => {
  const currentDate  = new Date();
  const currentSeconds = currentDate.getTime() - currentSegmentStartTime;
  const percentage = currentSeconds/(currentSegment.timespan_seconds*1000);
  const currentLongitude = previousSegment.longitude*(1-percentage)+currentSegment.longitude*percentage;
  const currentLatitude = previousSegment.latitude*(1-percentage)+currentSegment.latitude*percentage;
  return [currentLongitude, currentLatitude];
}

