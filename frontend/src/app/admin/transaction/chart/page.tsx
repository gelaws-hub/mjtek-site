// src/app/transactions/page.tsx
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
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

interface Transaction {
    id: number;
    user_id: string;
    total_items: number;
    total_price: number;
    description: string;
    transaction_detail: TransactionDetail[];
    transaction_log: TransactionLog[];
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

    useEffect(() => {
        fetchTransactions();
    }, []);

    const getChartData = () => {
        // Group transactions by month
        const monthlyData = transactions.reduce((acc: any, transaction) => {
            const date = new Date(transaction.transaction_log[0]?.timestamp);
            const month = date.toLocaleString('default', { month: 'short' });
            acc[month] = (acc[month] || 0) + transaction.total_price;
            return acc;
        }, {});

        return {
            labels: Object.keys(monthlyData),
            datasets: [
                {
                    label: 'Monthly Sales',
                    data: Object.values(monthlyData),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
            ],
        };
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Monthly Sales Overview',
            },
        },
    };

    return (
        <div className="container mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Transaction Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                        <Card>
                            <CardContent className="pt-6">
                                <Line
                                    options={chartOptions}
                                    data={getChartData()}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs
                        defaultValue="transactions"
                        onValueChange={setActiveTab}
                    >
                        <TabsList>
                            <TabsTrigger value="transactions">
                                Transactions
                            </TabsTrigger>
                            <TabsTrigger value="logs">Logs</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                        </TabsList>

                        <TabsContent value="transactions">
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>User</TableHead>
                                            <TableHead>Items</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={6}
                                                    className="text-center"
                                                >
                                                    Loading...
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            transactions.map((transaction) => (
                                                <TableRow key={transaction.id}>
                                                    <TableCell>
                                                        {transaction.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {transaction.user_id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            transaction.total_items
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        $
                                                        {
                                                            transaction.total_price
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            transaction
                                                                .transaction_log[0]
                                                                ?.order_status
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => {
                                                                    /* Handle view details */
                                                                }}
                                                            >
                                                                View
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={async () => {
                                                                    try {
                                                                        await axios.delete(
                                                                            `${process.env.NEXT_PUBLIC_API_URL}/transaction/${transaction.id}`,
                                                                        );
                                                                        toast({
                                                                            title: 'Success',
                                                                            description:
                                                                                'Transaction deleted',
                                                                        });
                                                                        fetchTransactions();
                                                                    } catch (error) {
                                                                        toast({
                                                                            variant:
                                                                                'destructive',
                                                                            title: 'Error',
                                                                            description:
                                                                                'Failed to delete transaction',
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        {/* Add TabsContent for logs and details */}
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
