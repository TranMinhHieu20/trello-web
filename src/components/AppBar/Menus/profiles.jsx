import { useState } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

function Profiles() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: '0' }}
          aria-controls={open ? 'basic-menu-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 32, height: 32 }}
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExMWFhUXGBgWGBUYGBUXFxgYFxUXFxUYGhgYHSggGB0lHRcXITEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGhAQGi0fHx8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTctN//AABEIAQYAwQMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAEAgMFBgABBwj/xAA/EAABAgMEBwYEAwgCAwEAAAABAAIDBBEFEiExBkFRYXGRsSIygaHB8BNC0eEUYnIHFSNSorLC8YKSJDM0Fv/EABkBAAMBAQEAAAAAAAAAAAAAAAECAwAEBf/EACIRAQEAAgIDAAIDAQAAAAAAAAABAhEhMQMSQSJRBDJhE//aAAwDAQACEQMRAD8AsgSY3c97EoBaj933sKOXTLBoecT+l39zValT9GHUPgeoVphxdqWUT6hWt/8ALcfyhS74oAqckAZN/wAYxaCmAzxTwmXxqDCDXkiIAXaqVRwYa4mqCdIv+JfwpWqkHvAzK1DHZSj3wGB1XPFdijrc0rl4AoX1d/K2hPA7FznSHTR7+zDdcHGruYyQPrbqcvPy8IkGMwE49pwCj5nSOTc8/wDkMB3EEc1wuNPuJxeeX1TBmTtHTok3TesdytONDLGmHEbEBObSDq3FS+j0YfBp+Y6juXnmDOOaatcQdx+lCrtot+0aJAHw4zfiQye8MHjLXkeBpxR9g9dOrzYvOaWvDS2u/On0RsGKKYkE61XLNtqDGc2NCdeBFDTMa8RqKlZd4BvVwONFthof+IbtSI0w0CuaCnJxoxvUKipO0LzyHHA6kNseiRK1BqNZNMK+iRcGNSG4cUVFF0FlQRnjqQs5kCRS9hkcFO/6IAzNHGlXNGBywrsW48CpAdxQ8OXIq04uJ8CNqfbJmneJcdSl38A1+Ju4NAING0IqDjsRNtwaUN2lcd+xOSQh/EvuN1kIVoaVLhjh4oe0bRMejiKAGgG7PHeqeD+wVHUWJdFi69sYqkTHd97FsJMz3PewpL00Smj+oVxqfMqyzQcy6W41NCPCtVWtHcx71lWSamgXshgitcTswy4pOBPMiB3WiNa+oUdGhD4h3NFPNPyMQmHUpmFRHgCpXJtOdNHOe6HCfdYMLwzdtpuUt+07S4S7PgNPbeKk/wArfvQhcdiTJjGlCarUYMZNtdVzrx4n6IeK9jjhSuxWGydHS9mKkP8A8jDpvSbVmKivaeC0CdatM/os4YsKrU9IRIfeaeIxHJbbXGwO4jgUpkYhBveeISWv2LF2s2j9sxJeIHwzQ62/K4bF23R+2mzUH4jSK5EHNp2H6rzlCibFdNB9IzLxgSew7svG1u3iM0Oms265MHskOIJ2pFjSgLr1a7EW2z75vEihxG8I2BLBuSbXKekZabz8QUpqrzTtqPAu1176IO15OK+M0taboIqcNqet6MG3apcuq0pqBKmrsc6AHJRj59zHvb39QN7u8DtREe0bzSGkDCm8qNMoSbuVcAdVVyeXLKWTAbD8/MsNABgR44bdqyARcFP5vRBiBnU1IwRcuKMH6j0R/jZXLy8/otKWLFi9HTBU3Ndz3sToTc33OfRLl00SNhRAMTkD6uUu7tR2uuUAx8s+KrtmE3cMy7ZvcpATjw/5r3h0U7Z0eRZXxA57iP5R6rLNP8LmgLMjuJcHA1RUu+kJx/K71Tb3C6087aeWgY85GfteQODeyOit2imjTGQ2ueKuIBP0VDhn4kxCr8z218SKrs0q2gWqvjhyFBAFKLbmpxJcgrA0WGEHHlGnMAoubmmQ2lz3Bo2lVua0pbW7DYXbzhyCWxt6C2novCeagXTtbgqtaWi8RmLe0N2BVuZa8UnGFhxNVIQ33hUtI3FT3YPrK5MbzTRw9CipeJiC047DgTwqrXpRZDSL4FCqe2WLnBgGJcGiuVSaKku4jljZXoP9mltfiJMNd34RuGudM2+WHgj7fiFlC1xFdi5hojNfu6NeL3vhlt2LUfLnfbTO6dWytF0t4EWI14ewtwIAOrOqO9zgnkxs7EWJLPAvPJNcqla0hgXh3anbsUrAc3IEIW0owAI1kYI2cF0pUCUdfpR1disckW/DDDW+Dkc9a3Zza9ojFSUSAA0YdrOtNSTx4SDZqKu+XuVJFR0rkea0xlGAbyeqnIUmXOoa0OB+qjrVg3HXTq+63j8Uwz3C0JVYtVWLpYOCm5wdjn0SykTfc59EmXTRIWFDJIAFcR1KsLbJd8YxKYYHPmoPRiPcfU5ZeZVtfaDQ4txrh/UpmCGH/EdTDAFA2pHuycw/KkKJ0IUjFd/FP6VWtNI9yzY+8Bv/AGiNB8imaOBSka7MQTsiN/uFV2yXK4TFJDq7HeYXRY05FmrrYRIh3WknIEuAJqfGlNyFVwul0M0zK8K8VqNFoKhVOWs/4ZxcSQrDZsYPF05pfb4rq6VyelnRXkvOFcAiZeFDhNNABTEnDzJyRU7Do8gKDmLNMRrxFa7HuAEUBr3iMieOQySzmjZqbkai2+y9QPacaYOqpeTiFwqoqzLALRdxONanb76qyQoF0JbOTS3XIObgBzS0qtydlNbEvH5SrW9AmGA8nUR76pbR1NktcyKwUFLuojGnzDlVFaCTR+EWF3bhOLPAE08w7wAQ0OHQBxFKjHVQayfBCfsvnGRI8dr69ur28Q8+jvJPhyl/InDqNixSXmuOGaKtSWvngE5Z7WDuoe1Zgh4aK4hV3K5daalXgACuKlIkelG5YVUdZ8jgHOxcck5bMa4A3WdewLXKYzdHKn4todnLxVbtFxJBOJNSp+BMB12E5moKGt+CGRLoyp1AWw3ctlqPWlqqxVY01Nznc59E6E1O9zn0S5dND9mvIqQMcNVdZUm+bfeqQb1ActhwQVhZkbaDzKsk1KuD2uwxo36KVxp5ZoPIzL3vcXNINOCrX7SI1LPp/NEaOV53VoVu+GWPLc+zUlUL9qEcfh4TMqvc7/qWj/Ipuo05rjcduBP56eSuOhdrAS7mfNDNTvB7p8iFUorahzfzg8xT0Uho5/Bm2seBdidkjMdrFvnRC9HxuslmnrTjRIYdBaLl67U4udjSoGTRvxyU1otBitFYjgTXVqz18kVLWSwHAUG5SjYQbQZBKvpHzo7ZT0vQoe2IzG4lwA2k0p4pqz5kEihBBGBBqOaTeqezc2mGQwEPNFEVwQkYpsrwWBHhCRzTFHREFN5KZldt7SCF8B0OG+89/ZIHyg96uzDDxQWgT7szDNaAvDTwebnVwVenWUjRB+b0+6lrAN1z3fyC/wD9XscOirr1x4c2WVyvL0JLNuUxSZyaa17a4kqPMZxFRqx3ocRBENW5tzJXP/141E6lo00XRQ0GgBGWHFLtuO1z4eIoK18lHS80XdnAVNKpq0ZBzHAVwdltTW2y/SbEy06bz350HsBAz0YvIcczX0omaBtRXikOdUN8fRN/Hy51WrKrFtYutjKRN9zn0Tibmx2OfRDLpoOsHveI/uKuE5kz9QVQsPveI/uKtk67Bv6ghBNTZ/i/8CuZftMBIgtFczzcSf8AELpU3/7P+JVA/aDC/wDnOoxLp8XUH9yGXQ49uQTUMgOdTC9dPGl4eqlNJ2UihzdVCDwxZ/Tc5Jc1L3oEw2mLYzHA4a2vH080/pCA+BLRRrZdI2FgaCOdUm1NL7YFoCLCZEHzDHccnDmpCbhlzSAaHUVzXQi2fhxfgPPZfi3c/KniPMb10eFGQsWxy3Non92EgfEIca44YcaImXlWsOApqHDYEDbVsOYS1jSTsGZ4KLbCjHtOIYN57XVLx8dEwuUW4xQBmmHuqq/Jy5cQXPc4DVWg8lMnDJC3ZLj63TbkDPHAp9z0Me07cEoOeaQw7sw7fQ+QHojbHYXRIjB80Nw/pr6Jem0CkVjtoI5YjqjNAoYdPMacnNcON6G5o8yFW846c3VrrVnzF6DBcKYw2Go11aCnxBwddzO5FaJwYb5KD2RVrbh4sJaeilvwjQBTUpzwp1FmxDdBDu1nTV4Jq3o5vsqMm+Zz6KZ+GdqDnJRpIc45VT5YcahdICQlGxS8ucRTIbapuZh3SG502cApSNGa0dnUKAcMlERIhdQnMipQ8GOON47CtrFi2uljYCRN9zn0TibmR2OfRDLpoPsJpJNBWlD/AFFWqNVwFNRB5KvaMd5/6f8AJWWE3AYFJs2jESDV14nVRVjTqzb8q8M7zO2072kO9CrgW7SAh5iCx1Q4F2FOaF5GcPOwiguLqdmKwVGVHBwr1I8UXaDLspDbT5iRxDaOHG66H4AJqZkzDiPhVp8OI8A0/ORjt7tfFSGkUVrZa5kb8N4GZoYbycd4MNTnat6UCcNDhhSnOtQujaIaSCYYGPNIrRj+YD5h6jUuczuYGvMpqE4tIc0kEYgjAjxVbNwuOXrXZHSgrfZ3jrOK0yx4j+8fBVOwdNKUbHwOH8QZH9Q1cR5K/wAnabHNDmuBBFQQagqXr+3Tj5LritQLPDBkmZhwC3NTijIry5C6+NN/TUaLU0CJlWYJtkujGMoEsjWqvptK3oQd/KQeZp6qE0bmzCjwYo+VwJp+VwdTyV0t6XvwHja089SotiTDYcVjnirK9objgfe5Ux6Rz7271odGAMeCO6IrojDqLI1IjSP+ymoMxV5ZWtFUrB/gRYLSaggwA7awgxJZ3IPZxargyAA4uAxOapEbSI8YNzqouZj3wdwrvRtpuJbRtDtUXHhXadrH7KPktAM6FUXscCBxvHWmJ1tHUGQRMKZBhkl2Idg2vmdqDmXVcDu9Sj/H1sKxYtrF0gbqkzHc59FsLJjuc+iGXTRM6Kuo5/6f8lYi47VXNGe879P+SsSSGYku1rTolFF25bsKXhlxcC6nZZUVcdXAbStR05paUi0zUxFzDZkNptD3OvDnTkqppNMXojm6mUb4ilR4Up4BWWetWHCgxWBwiOidouxHbNC4jbiKjiqBNxCQTt9VLHta9I4ipLlqIMfAJ8NwCbjjE+A8lZNhb0XR9BW35NgOovH9RPqudRdm9dS0Ag3ZVo2knmUuXJ8OKkvwaV+GopMwwm3tSeqm6jxCW3ogtQ8ZbTbCzQq0jcubRGXYj27HEjgSulxdYXObbF2YrqK07Ln06Rona/xZYMce3Ba17TtbCiNcBjrDS4cCF1MrztYFoGE87HBzTwcKH6rvtmzbYjQ4HMJsajlCIkp2g69gM1GzsAG85uojPMf7U8+CHZ8vVNiRberTCmIKGWGyKj2hUXaVFTwzC1MNIIBwIGXiVaJiVhsaXEAb9m5VqdcDEJGX3KPiw9ArVVixYqsbotR+572La1F7vvYtl0M7TGjXed+n/Iqbjxwxpc40AzKg9HB2nfp/yKZ0lne1cr2W4n9R+g6lTh5N0JbFtFwJyZjnsGs6lzyfmi4l3db4DDepi3pklorVrCRhrcM/DhvVFtebLzStGjIe8ykvNXk9YatCcDq0yy470BGdgFqI6oGyq1GOATyJ2lAZDd60TETvncSUS3Pl5klDPxcVpQOycuYjwBrXYNH5e5Da3YFT9FrDN0PV7lXXcC1LvdVk1BabcE5fBW6J9NQ5agi2pUq9mCDhQ8ULA2AmW4rnelTaRAfeZXSJ5uNVz/TBvaw2FL9a84oyFEyK61+zq277fgk9pow3s+1fdFx6Gat9+9imrBtJ0JzHtzaaj/IcCteOSa3w9FwYlQnaqD0etZkxCa9rsaeIOtrhrUyx1U8SsR+kTqQHHh1VZdq/SFb5+CHsLSKjYqjNCjyNQ1eOCMnJfpVViStosQ4rIvd97Fqi1F7vvYjl0M7S2j7qFx/LnuDiq5PTQc5z3ZVJptqcBw28lJS8xdhxaZllBxLiB1qoYMBOPdZieo+vJS2thFa0hjuzdgSKgbGknzKpkziSrNb0zec52snlqA8KKrxks7UyMRNiw4ge9f3TbjinGurxHsqiZTT2vAeSNseRMSJxPqg4MMl3j1V+0TsqlHFJf0aftZrKlAxrQP8AalBDCRAZQJ9Uk4bYOYhrcNxRLmpstQ0bbH4hDPqEUAmYy1ABOYjJUDSiH/EI/KT5ro0UYKhaRtvRX/pp1U6aKpANOiJguoSPEIYBOtdrT1Jc9EbXMOKAHEBxpgae/uNi6bI6RAG5EwI+fbXHELhUrFuuBrrB4LpErM/EF7aBXjQe/FJODWTJ0mHNse281wI2hVScdV7lHS0d8J15p4jUdxGtEOmbzq0plh4KkySyw1yIWJFViOyNpEwez72LZKRMHsj3qRy6admDEo1/AYbTfNOlPFAT8T4cI1158TUnofJKbEJeQcq7dm7i4FRulUbusGup5EBR26MYqFpxqmnifHJRMRtcUbMm8TTWUh7N2Cw3lGvZitw244J9zc0fZkjeNTgBSp2fdbYTEVYlm3ojQRvPh9yF0iz4AaAAoaw5G7ddSlTQDY0B1K8Tj4qxw2o4z6OV+CYYTiaYU4CqlbKQ5KSXBBiHFNvCWQtFZg7xgqZbMCsR/AK7OCrltS/aqBq6Go9Umc4NjXOo8Ojk3COYUpaUvQncTyP+wos4GvihKGUOsOvZ7+iu2iEzWrDs9+RHJUnfqKm9G5m7EHvchRx/ToZFRRNB1MU414oh4j01jT9C/wAWN6xR99Yh7B/ziZckTfdHvUnCE1Ons+9irn0hO0Ww0e4U11rxr9FXtLJjt8G+ZJVhmTR1dw6uHqqVpBFrEcdXunRc7pnW0ZDHa4JTwtyo1+P0ThbjwHmckaENysvV1F0CxtH2va1vdIxqPNx2nMD7Yw2j9mYtJFSTkeeKvUo4so1uL3bNu3gPojhN1srroybPcx2XZbgCMt/LLmnSKKVZL0oYhyybXrtK3MzDXChaCOnAq0mkfZFVSwVkSBsPgc02ajNA+z4K0Uljk4iJACS4J9sFxyB6dVp8udo8z0W0G4Dc2qAtKHgDsNffMqWfCpt5D6oSOAcC3mfoly6aZaUC2Jajjsy9AVW40LmCuiWlKtc2hGOLSanOmB53eapM2yhrTH1acehUt6U7gANw8x6omzotHA7/AH0SI9LxIyqT4H7VSJXAuGxG9FnboknM1YOSX8RBWcasCKCGzlVWLLhWIB7LFVDT57PPoiULO93n0XRl05se0ZaXy8KcycfVUa3HViuG/wAleYwqabOuXqqJaBrFcffui53VOobhYDjjwAUto9Zjo78MBmTsUPWpp4eq61ohZQhQW1GJxO/dz9E+OPtSZZesKs+yruAwAGLjnj9uqmpeVEMVa3tu1nUNQT0GGdeWfE/TYn3q8xkQt2jfwriauKWJUbUXcSHQ1tNsyZTem3ywT4iUwKy7rqtqNuhP3eKVDiN2aOkYAa3LHbrSSKp9poFtNugYpNSM05Cgp1jcap0tR0ASJLVTH4RuxHkg4JqIFtMr1qyFa08OIy97lzu3Zejjxrz/ANldYn2VaTsXNdJWi87hXz+6h5ZpbxVVZgYeHSgTcHv8R0Tk9kfeZqmpbUdhr6FL8P8AV3sx38NvBSLBUgKLsnuDxHJS8kKuBSwbxNpC6NixboFtU05t0YChZ/u8+iKCFtE4Dx6KmV/Fse0RMuoIhGoHmVULTh3Xnw8gB1VtmxgRtcP7qqqWu03idv0qud1/A1lNvRWV1vaObgu6SUKjWjUAAuD2c+kaF+tp8136Vd2Qdqv4uq5/L2KDUl6SYiYixd6rpI8SElzwMyEL8Ouv6pH4FuePErMJc9p1hNljTkUyZFuopBk3fzH3sCzCmsI11Tl7co4wHDG94LV+KNiwpRpG9KvhRAmYg118EoTzv5VmSMYDNNF1UL+JrmlfEQAPOvwIXNtJRzo4cv8AS6FNRVzrSl+JH5j5qHkq3i7VicNa+HomZTUnIpSoLKXfeoJPimuVvsc/wxxPVWCTh0ArnU1ULolA+JdbsvE8Ggu9KKwQ8/8Ak7qVsYXyX4cWLFiqgKBQlqHsjx6IoIO0zg3j6I59Gw/tEVO/L4nkPuq5bjaGm8f2t+isU6KkDh9T5UUBpAauduoPL7KDsqDk+/e2GvIrvVmxL0Np2gELh9ky957mayHU4kGi63oVNiJKhp7zOy4axsV/FXN5Yl4rzqQrn19mqciRqG68V2O95FILWuycQePorImnQnfLXmmzGjN1V80p8OM3uurxASf3jGGbARuS0Sf3o4ZtKULaGxb/AH40d6EQti2IJzahv/W00LaanW2owrQmIDvlHktPhQM7vhr+yPLHPxzNoSxHaeCHowd2GeOHqkufTG7TfUIgKLxsQkxMJiNNICYmEmWWhkbjx1QtJotXnj9FbJiYwKotqxLz/Pw1Lnyu18IAc3V4IpsPFo4nwH2QxacKZ5ouTji8XEZAgcqDqUFF00FhmkVwpQNIx/OTlvo0qVhjqepQehLwJZ4+ZzthyaDTH/ki4X1T49IeTstYsWJ0xIKAtCJiNwJ+i3Mz9wVLXU1mmSj4kw1zrxc2lBTEUy+6XPLjSvix/LZuM/Gp2+h9+CrVqRbzq7anyIHRSdqTt43WY7x6fVRDpd7ieyTga0GWGKm6b0J0Zh3o1NZFW7zmr3JSBbFL4cQwy7vAU1nHA547RgSVV9E7H+K6hvNwBa4YEEawVeJeyYodV8W8P00J8aq/jnDm8l5TsGUAbQ9onEk4kpqJJj2EXDwACbixcaKqIa5RIdQ5pUSE4mtcEgw6IsQ6G06uiadJMOYCIF3NIdMDUEGDGy4Z1dVn7tY3WR/yPROmI85YBMPbtxW1Gbc0DInxxQceOBrqVuM45CgTJgU3naltGBosUnWhIqNiNOxAxio5KRHWlEwpx5AKmuffe4jL0Cs9tS8RwIYKk0b4HM9EFJ2UGAB1Cdez7qdWwiDbibozOZ2BTslJhwugdn5jrcRqCOhSw2DkEUGADBY+l0lZAQpWFgKuZfNM+12vVREEYDgp+Owth3STg0CnAAKBhZDgqxyZVl5YkXliYglwVei2PDdUgXTU4g0WLEmbo8P0ltltZkT0880fZ8K7DiuGBo1g3F5pU7q0WLEuM/JXyX8Vss6zBDa0NNKADDXhxUmwUWLF1uKtxBXWksbisWLAedQISYKxYgIOI/UnIcDCq2sRYzHjUwohC4u3BbWIVjkKAMziBqTMzFA1LFiFZBTc0XFMtwWli5rdrRgb3jsHVAvbisWJL2t4+m2pYWLET1fp3uO96wq5DyHBYsVnHTNVixYsm//Z"
            alt="Beatiful Girl"
          ></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profiles"
        aria-labelledby="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        style={{ marginTop: '30px' }}
      >
        <MenuItem>
          <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles
