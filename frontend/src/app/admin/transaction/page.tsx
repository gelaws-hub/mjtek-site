// src/app/admin/transactions/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface Transaction {
    id: number;
    user_id: string;
    total_items: number;
    total_price: number;
    description: string;
}

interface TransactionDetail {
    id: number;
    product_id: number;
    transaction_id: number;
    quantity: number;
    total_price: number;
}

interface TransactionLog {
    id: number;
    transaction_id: number;
    user_id: string;
    order_status: number;
    timestamp: Date;
}

export default function TransactionPage() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('transactions');
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [transactionDetails, setTransactionDetails] = useState<
        TransactionDetail[]
    >([]);
    const [transactionLogs, setTransactionLogs] = useState<TransactionLog[]>(
        [],
    );
    const [loading, setLoading] = useState(false);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
            );
            setTransactions(response.data);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to fetch transactions',
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchTransactionDetails = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/transaction-detail`,
            );
            setTransactionDetails(response.data);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to fetch transaction details',
            });
        }
    };

    const fetchTransactionLogs = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/transaction-log`,
            );
            setTransactionLogs(response.data);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to fetch transaction logs',
            });
        }
    };

    useEffect(() => {
        fetchTransactions();
        fetchTransactionDetails();
        fetchTransactionLogs();
    }, []);

    const handleDeleteTransaction = async (id: number) => {
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/transaction/${id}`,
            );
            toast({
                title: 'Success',
                description: 'Transaction deleted successfully',
            });
            fetchTransactions();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to delete transaction',
            });
        }
    };

    return (
        <div className="container mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Transaction Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs
                        defaultValue="transactions"
                        onValueChange={setActiveTab}
                    >
                        <TabsList>
                            <TabsTrigger value="transactions">
                                Transactions
                            </TabsTrigger>
                            <TabsTrigger value="logs">
                                Transaction Logs
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="transactions">
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>User ID</TableHead>
                                            <TableHead>Total Items</TableHead>
                                            <TableHead>Total Price</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transactions.map((transaction) => (
                                            <TableRow key={transaction.id}>
                                                <TableCell>
                                                    {transaction.id}
                                                </TableCell>
                                                <TableCell>
                                                    {transaction.user_id}
                                                </TableCell>
                                                <TableCell>
                                                    {transaction.total_items}
                                                </TableCell>
                                                <TableCell>
                                                    ${transaction.total_price}
                                                </TableCell>
                                                <TableCell>
                                                    {transaction.description}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                /* Handle edit */
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDeleteTransaction(
                                                                    transaction.id,
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="details">
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>
                                                Transaction ID
                                            </TableHead>
                                            <TableHead>Product ID</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Total Price</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transactionDetails.map((detail) => (
                                            <TableRow key={detail.id}>
                                                <TableCell>
                                                    {detail.id}
                                                </TableCell>
                                                <TableCell>
                                                    {detail.transaction_id}
                                                </TableCell>
                                                <TableCell>
                                                    {detail.product_id}
                                                </TableCell>
                                                <TableCell>
                                                    {detail.quantity}
                                                </TableCell>
                                                <TableCell>
                                                    ${detail.total_price}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                /* Handle edit */
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => {
                                                                /* Handle delete */
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="logs">
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>
                                                Transaction ID
                                            </TableHead>
                                            <TableHead>User ID</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Timestamp</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transactionLogs.map((log) => (
                                            <TableRow key={log.id}>
                                                <TableCell>{log.id}</TableCell>
                                                <TableCell>
                                                    {log.transaction_id}
                                                </TableCell>
                                                <TableCell>
                                                    {log.user_id}
                                                </TableCell>
                                                <TableCell>
                                                    {log.order_status}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(
                                                        log.timestamp,
                                                    ).toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                /* Handle edit */
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => {
                                                                /* Handle delete */
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
