export function truncateEmail(email: string) {
  try {
    const [localPart, domain] = email.split("@");

    const truncatePart = (part: string, visibleChars: number) => {
      if (part.length > visibleChars) {
        return (
          part.slice(0, visibleChars) + "*".repeat(part.length - visibleChars)
        );
      }
      return part;
    };

    const truncatedLocalPart = truncatePart(localPart, 3);

    const [domainName, domainSuffix] = domain.split(".");

    const truncatedDomainName = truncatePart(domainName, 3);
    const truncatedDomain = `${truncatedDomainName}.${domainSuffix}`;

    return `${truncatedLocalPart}@${truncatedDomain}`;
  } catch (error) {
    return email; // In case email is not valid, return as is
  }
}
