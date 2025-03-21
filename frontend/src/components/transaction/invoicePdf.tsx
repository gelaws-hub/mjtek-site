import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Transaction } from "@/types/transaction";
import { Link } from "lucide-react";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  productContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  logoImage: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
  link: {
    color: "blue",
    textDecoration: "none",
  },
});

interface InvoicePDFProps {
  transaction: Transaction;
}

export default function InvoicePDF({ transaction }: InvoicePDFProps) {
  const formatPrice = (price: string | number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(Number(price));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <img
          src={"/logo_mjtek_transparent.png"}
          style={styles.productImage}
        />
        <Text style={styles.header}>Invoice</Text>
        <View style={styles.section}>
          <Text>ID Transaksi : {transaction.id}</Text>
          <Text>Status : {transaction.status.status_name}</Text>
          <Text>Mulai : {formatDate(transaction.start_time)}</Text>
          {transaction.end_time && (
            <Text>Selesai : {formatDate(transaction.end_time)}</Text>
          )}
        </View>
        <View>
          <Text>Nama Pengguna : {transaction.user.name}</Text>
          <Text>Email : {transaction.user.email}</Text>
          <Text>No. Telepon : {transaction.user.phone_number}</Text>
          <Text>Alamat : {transaction.user.address}</Text>
          {transaction.payment_proof && (
            <>
              <Text>Bukti Pembayaran : {transaction.payment_proof}</Text>
              <Link scroll={false} href={transaction.payment_proof} />
              <img src={transaction.payment_proof} style={styles.logoImage} />
            </>
          )}
        </View>

        {/* Products */}
        <Text style={styles.header}>Products</Text>
        {transaction.products.map((product) => (
          <View key={product.product_id} style={styles.productContainer}>
            {/* Product Image */}
            <img src={product.media_source} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.product_name} - {product.product_id}</Text>
              <Text>Kuantitas : {product.quantity}</Text>
              <Text>Harga : {formatPrice(product.price)}</Text>
              <Text>Total : {formatPrice(product.total_price)}</Text>
            </View>
          </View>
        ))}

        {/* Footer */}
        <Text style={styles.footer}>
          Total semua : {formatPrice(transaction.total_price)}
        </Text>
      </Page>
    </Document>
  );
}
