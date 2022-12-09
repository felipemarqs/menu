import { Container } from "./styles";
import { OdersBoard } from "../OdersBoard";
import { Order } from "../../types/Order";
import { useState, useEffect } from "react";
import { api } from "../../utils/api";

export function Orders() {
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		api.get("/orders").then(({ data }) => {
			console.log(data);
			setOrders(data);
		});
	}, []);

	const waiting = orders.filter((order) => order.status === "WAITING");
	const inProduction = orders.filter((order) => order.status === "IN-PROGRESS");
	const done = orders.filter((order) => order.status === "COMPLETED");

	function handleCancelOrder(orderId: string) {
		setOrders((prevState) => prevState.filter((order) => order._id != orderId));
	}

	function handleOrderStatusChange(orderId: string, status: Order["status"]) {
		setOrders((prevState) =>
			prevState.map((order) =>
				order._id === orderId ? { ...order, status } : order
			)
		);
	}

	return (
		<Container>
			<OdersBoard
				icon="🕑"
				title="Fila de espera"
				orders={waiting}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleOrderStatusChange}
			/>

			<OdersBoard
				icon="👩‍🍳"
				title="Em preparação"
				orders={inProduction}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleOrderStatusChange}
			/>

			<OdersBoard
				icon="✅"
				title="Concluído!"
				orders={done}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleOrderStatusChange}
			/>
		</Container>
	);
}
