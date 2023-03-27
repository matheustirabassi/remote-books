import { AppBar, Tab, Tabs, Typography } from "@mui/material"

import { LanguageConstants } from "enums/Constants"
import { TabPanel } from "presentation/components/TabPanel"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import SwipeableViews from "react-swipeable-views"
import AuthorView from "./Author/AuthorView"
import CategoryView from "./Category/CategoryView"
import CollectionView from "./Collection/CollectionView"

/**
 * A tela de cadastro.
 *
 * @returns Os componentes da tela de cadastro.
 */
export default function RegisterView() {
  /** A index do livro na guia */
  const INDEX_BOOK_TAB = 0

  /** A index do autor na guia */
  const INDEX_AUTHOR_TAB = 1

  /** A index da coleção na guia */
  const INDEX_COLLECTION_TAB = 2

  /**A index da categoria na guia */
  const INDEX_CATEGORY_TAB = 3

  const MOBILE_MAX_WIDTH = 600

  const { t } = useTranslation()

  /**
   * inicia o observer para a posição na tabela com 0,
   */
  const [tabPosition, setTabPosition] = useState(0)

  const [tabsVariantType, setTabsVariantType] = useState<
    "fullWidth" | "standard" | "scrollable" | undefined
  >(getVariantType(window.innerWidth))

  window.addEventListener("resize", () => {
    setTabsVariantType(getVariantType(window.innerWidth))
  })

  return (
    <>
      <AppBar>
        <Tabs
          value={tabPosition}
          onChange={(_, index) => {
            setTabPosition(index)
          }}
          variant={tabsVariantType}
          scrollButtons
          allowScrollButtonsMobile
          textColor={"secondary"}
          indicatorColor={"secondary"}
        >
          <Tab label={t(LanguageConstants.BOOK)} {...setTabIdProperty(INDEX_BOOK_TAB)} />

          <Tab label={t(LanguageConstants.AUTHOR)} {...setTabIdProperty(INDEX_AUTHOR_TAB)} />

          <Tab
            label={t(LanguageConstants.COLLECTION)}
            {...setTabIdProperty(INDEX_COLLECTION_TAB)}
          />

          <Tab label={t(LanguageConstants.CATEGORY)} {...setTabIdProperty(INDEX_CATEGORY_TAB)} />
        </Tabs>
      </AppBar>

      <SwipeableViews index={tabPosition} onChangeIndex={setTabPosition}>
        <TabPanel value={tabPosition} index={INDEX_BOOK_TAB}>
          <Typography>Livro</Typography>
        </TabPanel>

        <TabPanel value={tabPosition} index={INDEX_AUTHOR_TAB}>
          <AuthorView />
        </TabPanel>

        <TabPanel value={tabPosition} index={INDEX_COLLECTION_TAB}>
          <CollectionView />
        </TabPanel>

        <TabPanel value={tabPosition} index={INDEX_CATEGORY_TAB}>
          <CategoryView />
        </TabPanel>
      </SwipeableViews>
    </>
  )

  /**
   * Obtém o variante para as guias, dependendo do tamanho da tela.
   *
   * @returns Caso mobile `scrollable`, caso contrário `fullWidth`.
   */
  function getVariantType(
    windowWidth: number
  ): "fullWidth" | "standard" | "scrollable" | undefined {
    return windowWidth < MOBILE_MAX_WIDTH ? "scrollable" : "fullWidth"
  }

  /**
   * Define o identificador da guia
   *
   * @param index A posição da guia na tela.
   * @returns A propriedade `id` configurada.
   */
  function setTabIdProperty(index: Number) {
    return {
      id: `action-tab-${index}`,
      "aria-controls": `action-tabpanel-${index}`,
    }
  }
}
