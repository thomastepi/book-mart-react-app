import React from 'react';
import StatItem from './StatItem';
import { useSelector } from 'react-redux';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';

const StatsContainer = () => {
    const { stats } = useSelector((state) => state.allBooks);
    const defaultStats = [
        {
            title: "in-stock",
            count: stats["in-stock"] || 0,
            icon: <FaCalendarCheck />,
            color: '#2e71f3',
            bcg: '#fcefc7'  
        },
        {
            title: "pre-order",
            count: stats["pre-order"] || 0,
            icon: <FaCalendarCheck />,
            color: '#2e71f3',
            bcg: '#fcd7db'  
        },
        {
            title: "coming-soon",
            count: stats["coming-soon"] || 0,
            icon: <FaSuitcaseRolling />,
            color: '#e9b949',
            bcg: '#fcd7db'  
        },
        {
            title: "out-of-stock",
            count: stats["out-of-stock"] || 0,
            icon: <FaBug />,
            color: '#e64759',
            bcg: '#d7e4ff'  
        },
        {
            title: "sold-out",
            count: stats["sold-out"]|| 0,
            icon: <FaBug />,
            color: '#e64759',
            bcg: '#fcd7db'  
        },
    ];
  return (
    <Wrapper>
        {defaultStats.map((item, index) => {
            return <StatItem key={index} {...item} />;
        })}
    </Wrapper>
  )
}

export default StatsContainer