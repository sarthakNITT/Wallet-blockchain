# Overview

CryptoVault is a modern Solana wallet application built as a full-stack web application. It provides comprehensive wallet management capabilities including creating new wallets, loading existing wallets from seed phrases, managing multiple accounts per wallet, checking account balances, and creating custom SPL tokens on the Solana blockchain. The application features a sleek, crypto-themed UI with glassmorphism design elements and supports both development and production environments.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Build Tool**: Vite for fast development and optimized builds with hot module replacement
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: Custom React hooks (useWallet) combined with React Query for server state management
- **UI Framework**: Radix UI primitives with shadcn/ui components for accessible, customizable interface elements
- **Styling**: Tailwind CSS with custom CSS variables for consistent theming and responsive design
- **Component Structure**: Modular component architecture with separation between UI components, wallet-specific components, and page components

## Backend Architecture  
- **Runtime**: Node.js with Express.js for the web server
- **Language**: TypeScript throughout for consistent type safety
- **API Design**: RESTful API with dedicated routes for wallet, account, and token operations
- **Data Storage**: In-memory storage with planned PostgreSQL integration via Drizzle ORM
- **Development Setup**: Integrated Vite development server with Express for seamless full-stack development

## Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Schema**: Three main entities - wallets (mnemonic storage), accounts (derived keys), and tokens (SPL token metadata)
- **Migration Strategy**: Drizzle Kit for schema migrations and database management
- **Connection**: Neon Database serverless PostgreSQL for production scalability

## Solana Integration
- **Wallet Generation**: BIP39 mnemonic generation with ed25519-hd-key derivation for hierarchical deterministic wallets
- **Key Management**: TweetNaCl for cryptographic operations and Solana Web3.js for blockchain interactions
- **Account Derivation**: Standard Solana derivation path (m/44'/501'/x'/0') for multiple account support
- **SPL Token Support**: Full SPL token creation and management capabilities using @solana/spl-token

## Security Architecture
- **Key Storage**: Client-side only storage of sensitive cryptographic material
- **Derivation**: Industry-standard BIP44 hierarchical deterministic wallet structure
- **Network Isolation**: Separate handling of mainnet/devnet/testnet environments
- **Input Validation**: Zod schema validation for all API inputs and data structures

## Development Environment
- **Hot Reload**: Vite HMR integration with Express for real-time development
- **Type Checking**: Comprehensive TypeScript configuration across client, server, and shared modules
- **Error Handling**: Runtime error overlay and structured error responses
- **Path Aliases**: Configured module resolution for clean import statements

# External Dependencies

## Blockchain Infrastructure
- **Solana RPC**: Primary blockchain connectivity for transaction processing and balance queries
- **Neon Database**: Serverless PostgreSQL for scalable data persistence

## UI and Styling Libraries
- **Radix UI**: Comprehensive collection of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Modern icon library for consistent visual elements

## Cryptographic Libraries
- **@solana/web3.js**: Official Solana JavaScript SDK for blockchain interactions
- **@solana/spl-token**: SPL token program interface for token operations
- **bip39**: BIP39 mnemonic phrase generation and validation
- **ed25519-hd-key**: Hierarchical deterministic key derivation for ed25519
- **tweetnacl**: Cryptographic library for signing and key operations

## Development Tools
- **React Query**: Server state management and caching layer
- **React Hook Form**: Form state management with validation
- **Zod**: Runtime type validation and schema definition
- **Axios**: HTTP client for external API requests

## Build and Development
- **Vite**: Frontend build tool and development server
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind integration
- **TypeScript**: Static type checking across the entire codebase